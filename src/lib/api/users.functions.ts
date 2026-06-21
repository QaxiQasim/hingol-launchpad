import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = "https://dgmrndeeynprycxrbzgt.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || "";

// Admin client to manage auth.users
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper: Hash password
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

// Helper: Get Supabase Auth user ID by email
async function getAuthIdByEmail(email: string): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error || !data?.users) return null;
    const user = data.users.find(u => u.email === email);
    return user ? user.id : null;
  } catch (e) {
    return null;
  }
}

// 1. List all admin users
export const listAdminUsersFn = createServerFn({ method: "GET" })
  .handler(async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { success: true, users: data || [] };
    } catch (err: any) {
      console.error("Error listing admin users:", err.message);
      return { success: false, error: err.message, users: [] };
    }
  });

// 2. Create an admin user (Super Admin only action)
export const createAdminUserFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
    role: z.enum(["super_admin", "editor"]),
    is_active: z.boolean()
  }))
  .handler(async ({ data }) => {
    try {
      // Check if user already exists in auth.users
      const existingAuthId = await getAuthIdByEmail(data.email);
      let authUserId = existingAuthId;

      if (!existingAuthId) {
        // Create in Supabase Auth
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: data.email,
          password: data.password,
          email_confirm: true
        });
        if (authError) throw authError;
        authUserId = authData.user?.id || null;
      }

      // Hash password for public.admin_users
      const hashedPassword = hashPassword(data.password);

      // Insert into public.admin_users
      const { error: dbError } = await supabaseAdmin
        .from("admin_users")
        .insert([{
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: data.role,
          is_active: data.is_active
        }]);

      if (dbError) throw dbError;

      return { success: true };
    } catch (err: any) {
      console.error("Error creating user:", err.message);
      return { success: false, error: err.message };
    }
  });

// 3. Update an admin user
export const updateAdminUserFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.number(),
    email: z.string().email(),
    password: z.string().optional(),
    name: z.string().min(1),
    role: z.enum(["super_admin", "editor"]),
    is_active: z.boolean()
  }))
  .handler(async ({ data }) => {
    try {
      const updateData: any = {
        email: data.email,
        name: data.name,
        role: data.role,
        is_active: data.is_active
      };

      // Handle password update if provided
      if (data.password && data.password.trim() !== "") {
        updateData.password = hashPassword(data.password);
        
        // Find auth user ID and update password in Supabase Auth
        const authId = await getAuthIdByEmail(data.email);
        if (authId) {
          const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
            authId,
            { password: data.password }
          );
          if (authError) throw authError;
        }
      }

      // Update in public.admin_users
      const { error: dbError } = await supabaseAdmin
        .from("admin_users")
        .update(updateData)
        .eq("id", data.id);

      if (dbError) throw dbError;

      return { success: true };
    } catch (err: any) {
      console.error("Error updating user:", err.message);
      return { success: false, error: err.message };
    }
  });

// 4. Delete an admin user
export const deleteAdminUserFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.number(),
    email: z.string().email()
  }))
  .handler(async ({ data }) => {
    try {
      // 1. Delete from public.admin_users
      const { error: dbError } = await supabaseAdmin
        .from("admin_users")
        .delete()
        .eq("id", data.id);

      if (dbError) throw dbError;

      // 2. Delete from Supabase Auth
      const authId = await getAuthIdByEmail(data.email);
      if (authId) {
        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(authId);
        if (authError) {
          console.warn("Could not delete from Supabase Auth (might be deleted already):", authError.message);
        }
      }

      return { success: true };
    } catch (err: any) {
      console.error("Error deleting user:", err.message);
      return { success: false, error: err.message };
    }
  });
