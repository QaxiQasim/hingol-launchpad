import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseUrl = "https://dgmrndeeynprycxrbzgt.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper: Hash password
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

async function run() {
  const email = "admin@hingolmarketing.com";
  const password = "Hingol@2155";
  const name = "Super Admin";

  console.log(`Attempting to set/update admin user password to: ${password}...`);

  try {
    // 1. List users to check if user exists in Auth
    const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) throw listError;

    const existingUser = users.find(u => u.email === email);
    let userId;

    if (existingUser) {
      console.log(`User ${email} exists in Auth with ID: ${existingUser.id}. Updating password...`);
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        existingUser.id,
        { password: password }
      );
      if (updateError) throw updateError;
      userId = existingUser.id;
      console.log(`Success: Auth password updated successfully.`);
    } else {
      console.log(`User ${email} does not exist in Auth. Creating new user...`);
      const { data, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true
      });
      if (createError) throw createError;
      userId = data.user.id;
      console.log(`Success: Auth user created successfully.`);
    }

    // 2. Check if user profile exists in admin_users table
    const hashedPassword = hashPassword(password);
    const { data: dbUser, error: dbFetchError } = await supabaseAdmin
      .from("admin_users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (dbFetchError) {
      console.warn("Table admin_users might not exist in database yet (run SQL script first):", dbFetchError.message);
    } else if (dbUser) {
      console.log(`Profile for ${email} exists in admin_users table. Updating profile...`);
      const { error: dbUpdateError } = await supabaseAdmin
        .from("admin_users")
        .update({
          password: hashedPassword,
          name: name,
          role: "super_admin",
          is_active: true
        })
        .eq("id", dbUser.id);
      if (dbUpdateError) throw dbUpdateError;
      console.log("Success: Profile updated in admin_users table.");
    } else {
      console.log(`Profile for ${email} does not exist in admin_users table. Inserting profile...`);
      const { error: dbInsertError } = await supabaseAdmin
        .from("admin_users")
        .insert([{
          email: email,
          password: hashedPassword,
          name: name,
          role: "super_admin",
          is_active: true
        }]);
      if (dbInsertError) throw dbInsertError;
      console.log("Success: Profile inserted into admin_users table.");
    }
  } catch (err) {
    console.error("Error setting admin password:", err.message || err);
  }
}

run();
