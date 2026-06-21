import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Toaster, toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  LogOut,
  Trash2,
  Edit,
  CheckCircle,
  FilePlus,
  Image as ImageIcon,
  Loader2,
  Calendar,
  Eye,
  EyeOff,
  Copy,
  Plus,
  X,
  Search,
  Settings,
  Link as LinkIcon,
  Users as UsersIcon,
  AlertCircle,
  TrendingUp,
  Activity,
  Globe
} from "lucide-react";
import { listAdminUsersFn, createAdminUserFn, updateAdminUserFn, deleteAdminUserFn } from "@/lib/api/users.functions";
import { getIntegrationSettingsFn, saveIntegrationSettingsFn, getSearchConsoleDataFn, getAnalyticsDataFn, exchangeGoogleCodeFn, disconnectGoogleFn, testGoogleConnectionFn } from "@/lib/api/integrations.functions";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Hingol Marketing | Blog Admin Dashboard" },
      { name: "description", content: "Manage Hingol Marketing's digital marketing blog posts, SEO insights, and case studies." }
    ]
  }),
  component: AdminPage,
});

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  published: boolean;
  category: string;
  created_at: string;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  content_images?: string[] | null;
}

interface Category {
  id: number;
  name: string;
}

const DEFAULT_CATEGORIES = [
  "SEO", "Social Media Marketing", "Content Marketing",
  "PPC / Paid Ads", "Email Marketing", "Web Design",
  "Branding", "Digital Strategy"
];

function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "editor" | "users" | "search-console" | "analytics" | "settings">("posts");

  // User Profile state
  const [userProfile, setUserProfile] = useState<{ name: string; role: "super_admin" | "editor" } | null>(null);

  // Central UI Error Popup Modal state
  const [uiError, setUiError] = useState<{ title: string; message: string; code?: string; sqlInstruction?: boolean } | null>(null);

  // Google Integrations Settings state
  const [gscSiteUrl, setGscSiteUrl] = useState("");
  const [gaMeasurementId, setGaMeasurementId] = useState("");
  const [gaPropertyId, setGaPropertyId] = useState("");
  const [googleClientId, setGoogleClientId] = useState("");
  const [googleClientSecret, setGoogleClientSecret] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaving, setSettingsSaving] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [settingsTableMissing, setSettingsTableMissing] = useState(false);

  // Search Console data states
  const [gscDays, setGscDays] = useState<"7" | "28" | "90">("28");
  const [gscData, setGscData] = useState<any>(null);
  const [gscLoading, setGscLoading] = useState(false);

  // Analytics data states
  const [gaDays, setGaDays] = useState<"7" | "28" | "90">("28");
  const [gaData, setGaData] = useState<any>(null);
  const [gaLoading, setGaLoading] = useState(false);

  // User Management State
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [userLoading, setUserLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  // User Form fields
  const [userFormName, setUserFormName] = useState("");
  const [userFormEmail, setUserFormEmail] = useState("");
  const [userFormPassword, setUserFormPassword] = useState("");
  const [userFormConfirmPassword, setUserFormConfirmPassword] = useState("");
  const [userFormRole, setUserFormRole] = useState<"editor" | "super_admin">("editor");
  const [userFormActive, setUserFormActive] = useState(true);

  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Editor form state
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("SEO");
  const [published, setPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // New features state
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState(""); // tag input string
  const [keywordsList, setKeywordsList] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [contentImages, setContentImages] = useState<string[]>([]);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [showCustomCat, setShowCustomCat] = useState(false);
  const [catActionLoading, setCatActionLoading] = useState(false);

  // Scheduling & Link Insertion states
  const [publishMode, setPublishMode] = useState<"draft" | "immediate" | "schedule">("draft");
  const [scheduledDate, setScheduledDate] = useState("");
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkTargetBlank, setLinkTargetBlank] = useState(false);
  const [textareaSelection, setTextareaSelection] = useState<{ start: number; end: number }>({ start: 0, end: 0 });

  const [editorLoading, setEditorLoading] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const fetchUserProfile = async (email: string) => {
    const cleanEmail = email.toLowerCase().trim();
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", cleanEmail)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        if (!data.is_active) {
          toast.error("Your account has been deactivated.");
          await supabase.auth.signOut();
          setUserProfile(null);
          return;
        }
        setUserProfile({ name: data.name || "User", role: data.role as any });
      } else {
        // Fallback for primary administrator email
        if (cleanEmail === "admin@hingolmarketing.com") {
          setUserProfile({ name: "Super Admin", role: "super_admin" });
        } else {
          setUserProfile({ name: "Editor", role: "editor" });
        }
      }
    } catch (e: any) {
      console.error("Error fetching user profile:", e);
      if (e.message?.includes("admin_users") || e.message?.includes("schema cache") || e.code === "PGRST205") {
        setUiError({
          title: "Database Table Missing",
          message: "The 'admin_users' table does not exist in your Supabase database. Please create it using the SQL Editor in your Supabase Dashboard.",
          code: e.code || "PGRST205",
          sqlInstruction: true
        });
      }
      if (cleanEmail === "admin@hingolmarketing.com") {
        setUserProfile({ name: "Super Admin", role: "super_admin" });
      } else {
        setUserProfile({ name: "Editor", role: "editor" });
      }
    }
  };

  const fetchAdminUsers = async () => {
    setUserLoading(true);
    try {
      const res = await listAdminUsersFn();
      if (res.success) {
        setAdminUsers(res.users);
      } else {
        console.warn("Table probably does not exist yet:", res.error);
        if (res.error?.includes("admin_users") || res.error?.includes("schema cache")) {
          setUiError({
            title: "Database Table Missing",
            message: "The 'admin_users' table does not exist in your Supabase database. Please create it using the SQL Editor in your Supabase Dashboard.",
            code: "PGRST205",
            sqlInstruction: true
          });
        } else {
          setUiError({
            title: "User Fetch Failed",
            message: res.error || "Failed to list admin users."
          });
        }
      }
    } catch (e: any) {
      console.warn("Failed to fetch admin users:", e.message);
      setUiError({
        title: "Connection Error",
        message: e.message || "Failed to communicate with server."
      });
    } finally {
      setUserLoading(false);
    }
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userFormName.trim() || !userFormEmail.trim()) {
      toast.error("Name and Email are required.");
      return;
    }

    if (!editingUser && !userFormPassword) {
      toast.error("Password is required for new users.");
      return;
    }

    if (userFormPassword && userFormPassword !== userFormConfirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setUserLoading(true);
    try {
      if (editingUser) {
        const res = await updateAdminUserFn({
          data: {
            id: editingUser.id,
            email: userFormEmail.trim(),
            name: userFormName.trim(),
            role: userFormRole,
            is_active: userFormActive,
            password: userFormPassword ? userFormPassword : undefined
          }
        });
        if (res.success) {
          toast.success("User updated successfully!");
          resetUserForm();
          fetchAdminUsers();
        } else {
          toast.error(res.error || "Failed to update user.");
        }
      } else {
        const res = await createAdminUserFn({
          data: {
            email: userFormEmail.trim(),
            name: userFormName.trim(),
            role: userFormRole,
            is_active: userFormActive,
            password: userFormPassword
          }
        });
        if (res.success) {
          toast.success("User created successfully!");
          resetUserForm();
          fetchAdminUsers();
        } else {
          toast.error(res.error || "Failed to create user.");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred.");
    } finally {
      setUserLoading(false);
    }
  };

  const resetUserForm = () => {
    setEditingUser(null);
    setUserFormName("");
    setUserFormEmail("");
    setUserFormPassword("");
    setUserFormConfirmPassword("");
    setUserFormRole("editor");
    setUserFormActive(true);
  };

  const startEditUser = (user: any) => {
    setEditingUser(user);
    setUserFormName(user.name || "");
    setUserFormEmail(user.email || "");
    setUserFormPassword("");
    setUserFormConfirmPassword("");
    setUserFormRole(user.role || "editor");
    setUserFormActive(user.is_active);
  };

  const handleDeleteUser = async (user: any) => {
    if (user.email === session?.user?.email) {
      toast.error("You cannot delete your own account.");
      return;
    }
    if (!confirm(`Are you sure you want to delete user "${user.name}"?`)) return;

    setUserLoading(true);
    try {
      const res = await deleteAdminUserFn({
        data: {
          id: user.id,
          email: user.email
        }
      });
      if (res.success) {
        toast.success("User deleted successfully.");
        fetchAdminUsers();
      } else {
        toast.error(res.error || "Failed to delete user.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred.");
    } finally {
      setUserLoading(false);
    }
  };

  const handleToggleUserStatus = async (user: any) => {
    if (user.email === session?.user?.email) {
      toast.error("You cannot deactivate your own account.");
      return;
    }
    setUserLoading(true);
    try {
      const res = await updateAdminUserFn({
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          is_active: !user.is_active
        }
      });
      if (res.success) {
        toast.success(`User is now ${!user.is_active ? "Active" : "Inactive"}.`);
        fetchAdminUsers();
      } else {
        toast.error(res.error || "Failed to update status.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred.");
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        initializeApp(session.user.email);
      } else {
        setLoading(false);
        setUserProfile(null);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        initializeApp(session.user.email);
      } else {
        setPosts([]);
        setCategories([]);
        setLoading(false);
        setUserProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session && userProfile?.role === "super_admin") {
      fetchAdminUsers();
    }
  }, [session, userProfile]);

  useEffect(() => {
    if (userProfile && userProfile.role !== "super_admin" && (activeTab === "users" || activeTab === "search-console" || activeTab === "analytics" || activeTab === "settings")) {
      setActiveTab("posts");
      toast.error("Access denied: Super Admin role required.");
    }
  }, [userProfile, activeTab]);

  // Load Search Console & Analytics data when tabs activate or filters change
  useEffect(() => {
    if (session && userProfile?.role === "super_admin") {
      if (activeTab === "search-console") {
        fetchGscData(gscDays);
      } else if (activeTab === "analytics") {
        fetchGaData(gaDays);
      }
    }
  }, [activeTab, gscDays, gaDays, session, userProfile]);

  // Analytics real-time active users counter updates every 30 seconds
  useEffect(() => {
    let interval: any;
    if (session && userProfile?.role === "super_admin" && activeTab === "analytics") {
      interval = setInterval(() => {
        fetchGaData(gaDays);
      }, 30000);
    }
    return () => clearInterval(interval);
  }, [activeTab, gaDays, session, userProfile]);

  const initializeApp = async (email?: string) => {
    setLoading(true);
    await Promise.all([fetchPosts(), fetchCategories()]);
    if (email) {
      await fetchUserProfile(email);
      await fetchIntegrationSettings();
    }
    setLoading(false);

    // Google OAuth code exchange
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        setLoading(true);
        try {
          const redirectUri = window.location.origin + "/admin";
          const res = await exchangeGoogleCodeFn({ data: { code, redirectUri } });
          if (res.success) {
            toast.success("Successfully connected to Google APIs!");
            setIsGoogleConnected(true);
          } else {
            setUiError({
              title: "Google Connection Failed",
              message: res.error || "Failed to exchange Google OAuth code. Please verify your Client ID and Client Secret settings."
            });
          }
        } catch (err: any) {
          toast.error("Connection Error: " + err.message);
        } finally {
          // Clear code parameter from URL
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          url.searchParams.delete("scope");
          url.searchParams.delete("authuser");
          url.searchParams.delete("prompt");
          window.history.replaceState({}, "", url.pathname + url.search);
          setLoading(false);
        }
      }

      // Simulate error check if query param ?simulate_error=true is present
      const simulateError = urlParams.get("simulate_error");
      if (simulateError === "true") {
        setUiError({
          title: "Database Table Missing",
          message: "Could not find the table 'public.admin_users' in the schema cache. Please make sure you have executed the table creation SQL script inside your Supabase dashboard.",
          code: "PGRST205",
          sqlInstruction: true
        });
      }
    }
  };

  const fetchIntegrationSettings = async () => {
    setSettingsLoading(true);
    try {
      const res = await getIntegrationSettingsFn();
      if (res.success) {
        const settingsMap: Record<string, string> = {};
        res.settings.forEach((item: any) => {
          settingsMap[item.setting_key] = item.setting_value || "";
        });

        setGscSiteUrl(settingsMap["gsc_site_url"] || "");
        setGaMeasurementId(settingsMap["ga_measurement_id"] || "");
        setGaPropertyId(settingsMap["ga_property_id"] || "");
        setGoogleClientId(settingsMap["google_client_id"] || "");
        
        const sanitizedSecret = res.sanitizedSettings.find((s: any) => s.setting_key === "google_client_secret");
        setGoogleClientSecret(sanitizedSecret?.setting_value || "");

        const hasRefreshToken = !!settingsMap["google_refresh_token"];
        setIsGoogleConnected(hasRefreshToken);
        setSettingsTableMissing(false);
      } else {
        console.warn("Settings loading returned success false:", res.error);
        if (res.error?.includes("admin_settings") || res.error?.includes("schema cache")) {
          setSettingsTableMissing(true);
        }
      }
    } catch (err: any) {
      console.error("Error loading settings:", err.message);
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaving(true);
    try {
      const res = await saveIntegrationSettingsFn({
        data: {
          gsc_site_url: gscSiteUrl.trim() || null,
          ga_measurement_id: gaMeasurementId.trim() || null,
          ga_property_id: gaPropertyId.trim() || null,
          google_client_id: googleClientId.trim() || null,
          google_client_secret: googleClientSecret.trim() || null
        }
      });

      if (res.success) {
        toast.success("Integration settings saved successfully!");
        fetchIntegrationSettings();
      } else {
        toast.error(res.error || "Failed to save settings.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred.");
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleConnectGoogle = () => {
    if (!googleClientId) {
      toast.error("Please enter a Google Client ID first.");
      return;
    }
    const redirectUri = window.location.origin + "/admin";
    const scope = encodeURIComponent("https://www.googleapis.com/auth/webmasters.readonly https://www.googleapis.com/auth/analytics.readonly");
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&access_type=offline&prompt=consent`;
    window.location.href = authUrl;
  };

  const handleDisconnectGoogle = async () => {
    if (!confirm("Are you sure you want to disconnect your Google account? This will revoke API access tokens.")) return;
    setSettingsSaving(true);
    try {
      const res = await disconnectGoogleFn();
      if (res.success) {
        toast.success("Successfully disconnected Google Account.");
        setIsGoogleConnected(false);
        fetchIntegrationSettings();
      } else {
        toast.error(res.error || "Failed to disconnect Google account.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during disconnect.");
    } finally {
      setSettingsSaving(false);
    }
  };

  const handleTestConnection = async () => {
    setSettingsSaving(true);
    try {
      const res = await testGoogleConnectionFn();
      if (res.success) {
        toast.success("Connection test successful! APIs are reachable and authorized.");
      } else {
        toast.error(res.error || "Connection test failed. Access token may be invalid or expired.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during testing.");
    } finally {
      setSettingsSaving(false);
    }
  };

  const fetchGscData = async (days: "7" | "28" | "90") => {
    setGscLoading(true);
    try {
      const res = await getSearchConsoleDataFn({ data: { days } });
      if (res.success) {
        setGscData(res);
      } else {
        toast.error(res.error || "Failed to load Search Console data.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred fetching Search Console data.");
    } finally {
      setGscLoading(false);
    }
  };

  const fetchGaData = async (days: "7" | "28" | "90") => {
    setGaLoading(true);
    try {
      const res = await getAnalyticsDataFn({ data: { days } });
      if (res.success) {
        setGaData(res);
      } else {
        toast.error(res.error || "Failed to load Analytics data.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred fetching Analytics data.");
    } finally {
      setGaLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (err: any) {
      console.error("Error fetching posts:", err.message);
    }
  };

  const renderSettingsSetupCard = () => {
    return (
      <div className="card-surface p-6 md:p-8 max-w-2xl mx-auto text-center space-y-6 animate-fade-in border border-amber-950/30">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-bold font-display text-foreground">Database Setup Required</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            The <code className="text-amber-400 font-mono">admin_settings</code> table does not exist in your Supabase database. Please run the SQL script below in your Supabase SQL Editor to enable dynamic GSC & Analytics tracking.
          </p>
        </div>

        <div className="relative text-left">
          <pre className="text-xs bg-black/40 border border-border p-4 rounded-xl font-mono text-gray-300 overflow-x-auto max-h-48 select-all">
            {`CREATE TABLE IF NOT EXISTS public.admin_settings (
  id bigint primary key generated always as identity,
  setting_key text not null unique,
  setting_value text,
  updated_at timestamp with time zone default now()
);

INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('gsc_site_url', null),
('ga_measurement_id', null),
('ga_property_id', null),
('google_client_id', null),
('google_client_secret', null),
('google_refresh_token', null),
('google_access_token', null)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable public select access for GA4 tracking injection
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on admin_settings"
  ON public.admin_settings
  FOR SELECT
  USING (true);`}
          </pre>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`CREATE TABLE IF NOT EXISTS public.admin_settings (
  id bigint primary key generated always as identity,
  setting_key text not null unique,
  setting_value text,
  updated_at timestamp with time zone default now()
);

INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('gsc_site_url', null),
('ga_measurement_id', null),
('ga_property_id', null),
('google_client_id', null),
('google_client_secret', null),
('google_refresh_token', null),
('google_access_token', null)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable public select access for GA4 tracking injection
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public select on admin_settings"
  ON public.admin_settings
  FOR SELECT
  USING (true);`);
              toast.success("SQL copied to clipboard!");
            }}
            className="absolute top-3 right-3 px-2.5 py-1.5 bg-secondary hover:bg-secondary/80 text-[10px] rounded-lg border border-border/60 cursor-pointer flex items-center gap-1 font-semibold text-foreground transition-colors"
          >
            <Copy className="w-3 h-3 text-[oklch(0.82_0.13_85)]" /> Copy SQL
          </button>
        </div>

        <div className="text-[11px] text-muted-foreground leading-relaxed">
          💡 <strong>How to fix:</strong> Go to your <strong>Supabase Dashboard</strong> &rarr; click on <strong>SQL Editor</strong> &rarr; click <strong>New Query</strong> &rarr; paste this SQL &rarr; click <strong>Run</strong>. Then refresh this page.
        </div>
      </div>
    );
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      if (data && data.length > 0) {
        setCategories(data);
      } else {
        // Return default categories mapped
        setCategories(DEFAULT_CATEGORIES.map((name, i) => ({ id: i, name })));
      }
    } catch (err: any) {
      console.warn("Could not fetch categories (SQL table probably not created yet):", err.message);
      // Fallback categories
      setCategories(DEFAULT_CATEGORIES.map((name, i) => ({ id: i, name })));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err: any) {
      setAuthError(err.message || "Invalid login credentials");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddCustomCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCatName.trim();
    if (!trimmed) return;

    setCatActionLoading(true);
    try {
      const { data, error } = await supabase
        .from("categories")
        .insert([{ name: trimmed }])
        .select()
        .single();

      if (error) {
        if (error.message?.includes("unique")) {
          toast.error("Category already exists.");
        } else {
          throw error;
        }
      } else {
        toast.success(`Category "${trimmed}" added!`);
        setCategories(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
        setCategory(trimmed);
        setNewCatName("");
        setShowCustomCat(false);
      }
    } catch (err: any) {
      console.warn("Database insert failed (SQL probably not run). Adding locally.", err.message);
      // Local fallback insert
      const newLocalCat = { id: Date.now(), name: trimmed };
      setCategories(prev => [...prev, newLocalCat].sort((a, b) => a.name.localeCompare(b.name)));
      setCategory(trimmed);
      setNewCatName("");
      setShowCustomCat(false);
      toast.success(`Category "${trimmed}" added locally.`);
    } finally {
      setCatActionLoading(false);
    }
  };

  const handleDeleteCategory = async () => {
    const isDefault = DEFAULT_CATEGORIES.includes(category);
    if (isDefault) {
      toast.error("Default categories cannot be deleted.");
      return;
    }

    if (!confirm(`Are you sure you want to delete the category "${category}"?`)) return;

    setCatActionLoading(true);
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("name", category);

      if (error) throw error;

      toast.success(`Category "${category}" deleted.`);
      setCategories(prev => prev.filter(c => c.name !== category));
      setCategory("SEO"); // Reset to default
    } catch (err: any) {
      console.warn("Database delete failed (SQL probably not run). Deleting locally.", err.message);
      setCategories(prev => prev.filter(c => c.name !== category));
      setCategory("SEO");
      toast.success(`Category deleted locally.`);
    } finally {
      setCatActionLoading(false);
    }
  };

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setGalleryUploading(true);
    const files = Array.from(e.target.files);
    const newUrls: string[] = [];

    try {
      for (const file of files) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `content/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        newUrls.push(publicUrl);
      }

      setContentImages(prev => [...prev, ...newUrls]);
      toast.success(`Successfully uploaded ${files.length} images to gallery!`);
    } catch (err: any) {
      toast.error("Failed to upload content images: " + err.message);
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleDeleteContentImage = async (urlToDelete: string) => {
    try {
      // Extract file path from URL
      // E.g. https://[url]/storage/v1/object/public/blog-images/content/filename.png -> content/filename.png
      const parts = urlToDelete.split("/blog-images/");
      if (parts.length > 1) {
        const filePath = decodeURIComponent(parts[1]);
        await supabase.storage.from("blog-images").remove([filePath]);
      }
    } catch (err: any) {
      console.warn("Could not delete from storage bucket:", err.message);
    }

    // Always remove from local state array
    setContentImages(prev => prev.filter(url => url !== urlToDelete));
    toast.success("Image removed from gallery.");
  };

  const handleAddKeyword = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = keywordInput.trim();
      if (trimmed && !keywordsList.includes(trimmed)) {
        setKeywordsList(prev => [...prev, trimmed]);
        setKeywordInput("");
      }
    }
  };

  const handleRemoveKeyword = (kwToRemove: string) => {
    setKeywordsList(prev => prev.filter(k => k !== kwToRemove));
  };

  const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Image URL copied to clipboard!");
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const openLinkModal = () => {
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    setTextareaSelection({ start, end });
    setLinkText(selectedText);
    setLinkUrl("");
    setLinkTargetBlank(false);
    setShowLinkModal(true);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openLinkModal();
    }
  };

  const handleInsertLink = (e: React.FormEvent) => {
    e.preventDefault();
    const textarea = document.getElementById("content-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const { start, end } = textareaSelection;
    const formattedUrl = linkUrl.trim();
    if (!formattedUrl) return;

    let linkString = "";
    const textToUse = linkText.trim() || formattedUrl;

    if (linkTargetBlank) {
      linkString = `<a href="${formattedUrl}" target="_blank" rel="noopener noreferrer">${textToUse}</a>`;
    } else {
      linkString = `[${textToUse}](${formattedUrl})`;
    }

    const newContent = content.substring(0, start) + linkString + content.substring(end);
    setContent(newContent);
    setShowLinkModal(false);

    // Refocus and place cursor after the inserted link
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + linkString.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 50);
  };

  const startEdit = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setCategory(post.category || "SEO");
    setPublished(post.published);
    setExistingImageUrl(post.image_url);
    setImageFile(null);
    setSeoTitle(post.seo_title || "");
    setSeoDescription(post.seo_description || "");
    const kwString = post.seo_keywords || "";
    setKeywordsList(kwString ? kwString.split(",").map(k => k.trim()).filter(Boolean) : []);
    setContentImages(post.content_images || []);

    // Initialize publish mode from post
    if (post.scheduled_at) {
      setPublishMode("schedule");
      try {
        const d = new Date(post.scheduled_at);
        const tzOffset = d.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0, 16);
        setScheduledDate(localISOTime);
      } catch (e) {
        setScheduledDate("");
      }
    } else if (post.published) {
      setPublishMode("immediate");
      setScheduledDate("");
    } else {
      setPublishMode("draft");
      setScheduledDate("");
    }

    setActiveTab("editor");
  };

  const startNewPost = () => {
    setEditingPost(null);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("SEO");
    setPublished(false);
    setExistingImageUrl(null);
    setImageFile(null);
    setSeoTitle("");
    setSeoDescription("");
    setKeywordsList([]);
    setContentImages([]);
    setPublishMode("draft");
    setScheduledDate("");
    setActiveTab("editor");
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setEditorLoading(true);

    try {
      let finalImageUrl = existingImageUrl;

      // Handle featured image upload
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      const slug = generateSlug(title);
      const csvKeywords = keywordsList.join(", ");

      // Calculate published and scheduled_at based on publishMode
      let finalPublished = false;
      let finalScheduledAt: string | null = null;

      if (publishMode === "immediate") {
        finalPublished = true;
        finalScheduledAt = null;
      } else if (publishMode === "schedule") {
        if (!scheduledDate) {
          toast.error("Please select a date and time for scheduling.");
          setEditorLoading(false);
          return;
        }
        const schedTime = new Date(scheduledDate);
        if (schedTime <= new Date()) {
          toast.error("Scheduled date and time must be in the future.");
          setEditorLoading(false);
          return;
        }
        finalPublished = true;
        finalScheduledAt = schedTime.toISOString();
      } else {
        finalPublished = false;
        finalScheduledAt = null;
      }

      const postData = {
        title,
        slug,
        excerpt,
        content,
        category, // uses category column now
        published: finalPublished,
        scheduled_at: finalScheduledAt,
        image_url: finalImageUrl,
        seo_title: seoTitle || title,
        seo_description: seoDescription || excerpt,
        seo_keywords: csvKeywords,
        content_images: contentImages,
      };

      if (editingPost) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", editingPost.id);

        if (error) throw error;
        toast.success("Post updated successfully!");
        setActiveTab("posts");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([postData]);

        if (error) throw error;
        toast.success("Post created successfully!");
        startNewPost();
        setActiveTab("posts");
      }

      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || "Failed to save post.");
    } finally {
      setEditorLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setDeleteConfirmId(null);
      fetchPosts();
      toast.success("Post deleted successfully.");
    } catch (err: any) {
      toast.error("Error deleting post: " + err.message);
    }
  };

  // Stats calculation
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.published).length;
  const draftPosts = posts.filter(p => !p.published).length;

  const handleCloseErrorModal = () => {
    setUiError(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.has("simulate_error")) {
        url.searchParams.delete("simulate_error");
        window.history.replaceState({}, "", url.pathname + url.search);
      }
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[oklch(0.68_0.17_245)] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[oklch(0.82_0.13_85)] blur-[140px] opacity-40" />
        </div>

        <div className="card-surface p-8 max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <img src="/favicon.png" alt="Hingol Logo" className="w-16 h-16 mx-auto object-contain mb-4" />
            <span className="eyebrow mb-3">Admin Access</span>
            <h1 className="text-3xl font-bold font-display tracking-tight mt-2">Hingol Marketing</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in to manage SEO and Marketing blog insights</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hingolmarketing.com"
                className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            {authError && (
              <div className="p-3 text-xs text-red-400 bg-red-950/40 border border-red-900/60 rounded-lg">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="btn-gold w-full mt-2 cursor-pointer flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </div>
        <Toaster position="top-right" theme="dark" richColors />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-foreground">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[oklch(0.13_0.02_250)] border-b md:border-b-0 md:border-r border-border p-6 flex flex-col justify-between shrink-0 font-sans">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[oklch(0.82_0.13_85/0.3)] flex items-center justify-center bg-black/40 p-1">
              <img src="/favicon.png" alt="Hingol Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight">Hingol Admin</div>
              <div className="text-[10px] text-muted-foreground">Blog Manager</div>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("posts")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === "posts"
                  ? "bg-secondary text-foreground border border-border/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
            >
              <LayoutDashboard className="w-4 h-4" /> All Posts
            </button>
            <button
              onClick={startNewPost}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === "editor" && !editingPost
                  ? "bg-secondary text-foreground border border-border/50"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                }`}
            >
              <PlusCircle className="w-4 h-4" /> Add New Post
            </button>
            {userProfile?.role === "super_admin" && (
              <>
                <button
                  onClick={() => {
                    resetUserForm();
                    setActiveTab("users");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === "users"
                      ? "bg-secondary text-foreground border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                >
                  <UsersIcon className="w-4 h-4" /> Users
                </button>

                <button
                  onClick={() => {
                    setActiveTab("search-console");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === "search-console"
                      ? "bg-secondary text-foreground border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                >
                  <TrendingUp className="w-4 h-4" /> Search Console
                </button>

                <button
                  onClick={() => {
                    setActiveTab("analytics");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === "analytics"
                      ? "bg-secondary text-foreground border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                >
                  <Activity className="w-4 h-4" /> Analytics
                </button>

                <button
                  onClick={() => {
                    setActiveTab("settings");
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${activeTab === "settings"
                      ? "bg-secondary text-foreground border border-border/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                    }`}
                >
                  <Settings className="w-4 h-4" /> Integrations
                </button>
              </>
            )}
          </nav>
        </div>

        <div className="pt-6 border-t border-border/50 mt-6 md:mt-0">
          <div className="text-xs text-muted-foreground truncate mb-4 px-2">
            Logged in as:<br />
            <span className="font-semibold text-foreground">{session.user.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold bg-red-950/20 hover:bg-red-950/40 text-red-400 border border-red-900/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto font-sans">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-3xl font-bold font-display">
              {activeTab === "posts"
                ? "Blog Dashboard"
                : activeTab === "users"
                  ? "User Management"
                  : activeTab === "search-console"
                    ? "Google Search Console"
                    : activeTab === "analytics"
                      ? "Google Analytics GA4"
                      : activeTab === "settings"
                        ? "Integrations & Credentials"
                        : editingPost
                          ? "Edit Blog Post"
                          : "Add New Post"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {activeTab === "posts"
                ? "Overview, stats, and management of your digital growth insights"
                : activeTab === "users"
                  ? "Add, edit, deactivate and manage admin and editor user roles"
                  : activeTab === "search-console"
                    ? "Organic search performance, impressions, CTR, and search queries"
                    : activeTab === "analytics"
                      ? "Traffic analytics, active users, traffic sources, and devices breakdown"
                      : activeTab === "settings"
                        ? "Configure Google Search Console, Google Analytics (GA4) API credentials, and OAuth tokens"
                        : "Draft or publish articles, guides and SEO trends for Dubai audiences"}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* User Profile & Role Badge */}
            <div className="flex items-center gap-3 bg-secondary/20 border border-border/40 px-4 py-2 rounded-xl">
              <div className="text-right">
                <div className="text-sm font-semibold text-foreground">{userProfile?.name || "Hingol User"}</div>
                <div className="text-[10px] uppercase font-bold tracking-wider text-[oklch(0.82_0.13_85)] mt-0.5">
                  {userProfile?.role === "super_admin" ? "Super Admin" : "Editor"}
                </div>
              </div>

              <div className="w-px h-6 bg-border/60" />

              <button
                onClick={handleLogout}
                className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

            {activeTab !== "posts" && (
              <button
                onClick={() => setActiveTab("posts")}
                className="btn-ghost text-xs px-4 py-2 cursor-pointer"
              >
                Back to Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Stats Section */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="card-surface p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Articles</div>
                <div className="text-3xl font-bold font-display mt-2">{totalPosts}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="card-surface p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-[oklch(0.82_0.13_85)] font-semibold">Published</div>
                <div className="text-3xl font-bold font-display text-[oklch(0.82_0.13_85)] mt-2">{publishedPosts}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[oklch(0.82_0.13_85/0.1)] border border-[oklch(0.82_0.13_85/0.2)] flex items-center justify-center text-[oklch(0.82_0.13_85)]">
                <Eye className="w-5 h-5" />
              </div>
            </div>

            <div className="card-surface p-5 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Drafts</div>
                <div className="text-3xl font-bold font-display text-gray-300 mt-2">{draftPosts}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-400">
                <EyeOff className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        {/* Content Body */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.82_0.13_85)]" />
          </div>
        ) : activeTab === "posts" ? (
          /* TABLE VIEW */
          <div className="card-surface overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="font-semibold text-lg">Article Inventory</div>
              <button onClick={startNewPost} className="btn-gold text-xs px-4 py-2 cursor-pointer flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" /> Write Article
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <ImageIcon className="w-12 h-12 mx-auto stroke-1 opacity-40 mb-3" />
                <div className="font-semibold text-foreground">No blog posts found</div>
                <p className="text-sm mt-1">Get started by creating your first article to display on the blog.</p>
                <button onClick={startNewPost} className="btn-gold text-xs px-4 py-2 mt-4 cursor-pointer">
                  Create First Post
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="p-4 w-20">Preview</th>
                      <th className="p-4">Title</th>
                      <th className="p-4 w-32">Category</th>
                      <th className="p-4 w-24">Status</th>
                      <th className="p-4 w-32">Date</th>
                      <th className="p-4 w-24 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 text-sm">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-4">
                          {post.image_url ? (
                            <img
                              src={post.image_url}
                              alt={post.title}
                              className="w-12 h-12 rounded-lg object-cover bg-muted"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-[oklch(0.2_0.025_255)] flex items-center justify-center text-muted-foreground border border-border">
                              <ImageIcon className="w-5 h-5 stroke-1" />
                            </div>
                          )}
                        </td>
                        <td className="p-4 font-medium max-w-xs sm:max-w-md truncate">
                          <div>{post.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">{post.slug}</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-[oklch(0.82_0.13_85/0.1)] text-[oklch(0.82_0.13_85)] border border-[oklch(0.82_0.13_85/0.2)]">
                            {post.category || "SEO"}
                          </span>
                        </td>
                        <td className="p-4">
                          {post.scheduled_at && new Date(post.scheduled_at) > new Date() ? (
                            <span className="inline-flex flex-col gap-0.5 text-xs font-medium text-amber-400 bg-amber-950/20 px-2.5 py-1.5 rounded-lg border border-amber-900/40">
                              <span className="flex items-center gap-1 font-semibold">
                                <Calendar className="w-3 h-3 text-amber-400" /> Scheduled
                              </span>
                              <span className="text-[10px] text-amber-400/80 leading-none">
                                {new Date(post.scheduled_at).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })} {new Date(post.scheduled_at).toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </span>
                          ) : post.published ? (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-green-400 bg-green-950/20 px-2.5 py-1.5 rounded-lg border border-green-900/40">
                              <CheckCircle className="w-3 h-3" /> Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-400 bg-yellow-950/20 px-2.5 py-1.5 rounded-lg border border-yellow-900/40">
                              <EyeOff className="w-3 h-3" /> Draft
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {deleteConfirmId === post.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="text-xs font-bold text-red-400 bg-red-950/40 px-2.5 py-1.5 rounded-lg border border-red-900/50 hover:bg-red-900/60 cursor-pointer"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="text-xs font-semibold text-muted-foreground bg-secondary/80 px-2.5 py-1.5 rounded-lg border border-border hover:bg-secondary cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => startEdit(post)}
                                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                                  title="Edit Post"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                {userProfile?.role === "super_admin" && (
                                  <button
                                    onClick={() => setDeleteConfirmId(post.id)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
                                    title="Delete Post"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : activeTab === "users" ? (
          /* USER MANAGEMENT VIEW */
          <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
            {/* User List Table (Left 2 cols) */}
            <div className="lg:col-span-2 card-surface overflow-hidden self-start">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="font-semibold text-lg">System Users</div>
                {userLoading && <Loader2 className="w-4 h-4 animate-spin text-[oklch(0.82_0.13_85)]" />}
              </div>

              {adminUsers.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <UsersIcon className="w-12 h-12 mx-auto stroke-1 opacity-40 mb-3" />
                  <div className="font-semibold text-foreground">No admin users found</div>
                  <p className="text-sm mt-1">Please make sure the SQL database schema is applied.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border bg-secondary/30 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4 w-28">Role</th>
                        <th className="p-4 w-24">Status</th>
                        <th className="p-4 w-28">Date Added</th>
                        <th className="p-4 w-24 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 text-sm">
                      {adminUsers.map((user) => (
                        <tr
                          key={user.id}
                          className={`hover:bg-secondary/20 transition-colors ${!user.is_active ? "opacity-50" : ""}`}
                        >
                          <td className="p-4 font-medium truncate">{user.name}</td>
                          <td className="p-4 text-muted-foreground truncate">{user.email}</td>
                          <td className="p-4">
                            <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${user.role === "super_admin"
                                ? "bg-[oklch(0.82_0.13_85/0.12)] text-[oklch(0.82_0.13_85)] border border-[oklch(0.82_0.13_85/0.2)]"
                                : "bg-secondary text-foreground border border-border/50"
                              }`}>
                              {user.role === "super_admin" ? "Super Admin" : "Editor"}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              type="button"
                              onClick={() => handleToggleUserStatus(user)}
                              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border cursor-pointer select-none transition-colors ${user.is_active
                                  ? "text-green-400 bg-green-950/20 border-green-900/40 hover:bg-green-950/40"
                                  : "text-gray-400 bg-gray-900/40 border-gray-800 hover:bg-gray-900/60"
                                }`}
                              title={user.is_active ? "Click to Deactivate" : "Click to Activate"}
                            >
                              {user.is_active ? "Active" : "Inactive"}
                            </button>
                          </td>
                          <td className="p-4 text-xs text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => startEditUser(user)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                                title="Edit User"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-950/20 transition-colors cursor-pointer"
                                title="Delete User"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Add / Edit Form (Right 1 col) */}
            <div className="card-surface p-6 self-start space-y-4">
              <h3 className="font-semibold text-lg border-b border-border/40 pb-3 flex items-center gap-2">
                {editingUser ? <Edit className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> : <PlusCircle className="w-4 h-4 text-[oklch(0.82_0.13_85)]" />}
                <span>{editingUser ? "Edit User Details" : "Invite New User"}</span>
              </h3>

              <form onSubmit={handleSaveUser} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userFormName}
                    onChange={(e) => setUserFormName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={!!editingUser}
                    value={userFormEmail}
                    onChange={(e) => setUserFormEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    {editingUser ? "New Password (leave empty to keep current)" : "Password *"}
                  </label>
                  <input
                    type="password"
                    required={!editingUser}
                    value={userFormPassword}
                    onChange={(e) => setUserFormPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required={!!userFormPassword}
                    value={userFormConfirmPassword}
                    onChange={(e) => setUserFormConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    User Role
                  </label>
                  <select
                    value={userFormRole}
                    onChange={(e) => setUserFormRole(e.target.value as any)}
                    className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground"
                  >
                    <option value="editor">Editor</option>
                    {editingUser && <option value="super_admin">Super Admin</option>}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    User Status
                  </label>
                  <div className="flex items-center gap-3 bg-[oklch(0.2_0.025_255)] border border-border p-3.5 rounded-xl">
                    <input
                      type="checkbox"
                      id="user-status-active"
                      checked={userFormActive}
                      onChange={(e) => setUserFormActive(e.target.checked)}
                      className="w-4 h-4 rounded text-[oklch(0.82_0.13_85)] border-border bg-background focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <label htmlFor="user-status-active" className="text-sm font-medium cursor-pointer select-none">
                      Active (Allowed to Login)
                    </label>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  {editingUser && (
                    <button
                      type="button"
                      onClick={resetUserForm}
                      className="flex-1 btn-ghost text-xs py-2.5 cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={userLoading}
                    className="flex-1 btn-gold text-xs py-2.5 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {userLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    {editingUser ? "Save Changes" : "Send Invite"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : activeTab === "search-console" ? (
          /* SEARCH CONSOLE VIEW */
          <div className="space-y-6 animate-fade-in">
            {/* Status & Date Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/10 border border-border/60 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${gscData?.isConnected ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
                <span className="text-xs font-semibold text-foreground">
                  {gscData?.isConnected 
                    ? "Live Search Console Sync Active" 
                    : "Simulated Search Console (Sandbox Mode)"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium">Date Range:</span>
                <select
                  value={gscDays}
                  onChange={(e) => setGscDays(e.target.value as any)}
                  className="rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-3.5 py-2 text-xs focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="28">Last 28 Days</option>
                  <option value="90">Last 3 Months</option>
                </select>
              </div>
            </div>

            {gscLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.82_0.13_85)]" />
              </div>
            ) : gscData ? (
              <>
                {/* GSC KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="card-surface p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Clicks</div>
                    <div className="text-3xl font-bold font-display text-[oklch(0.82_0.13_85)] mt-2">
                      {gscData.summary?.clicks?.toLocaleString() || "0"}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Google search traffic visits</p>
                  </div>

                  <div className="card-surface p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Impressions</div>
                    <div className="text-3xl font-bold font-display text-foreground mt-2">
                      {gscData.summary?.impressions?.toLocaleString() || "0"}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Times site appeared in search results</p>
                  </div>

                  <div className="card-surface p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Average CTR</div>
                    <div className="text-3xl font-bold font-display text-blue-400 mt-2">
                      {gscData.summary?.ctr || "0.0%"}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Click-through percentage</p>
                  </div>

                  <div className="card-surface p-5">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Average Position</div>
                    <div className="text-3xl font-bold font-display text-amber-400 mt-2">
                      {gscData.summary?.position || "0.0"}
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">Average ranking for key terms</p>
                  </div>
                </div>

                {/* Line Chart */}
                <div className="card-surface p-5 md:p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-lg">Search Performance Over Time</h3>
                      <p className="text-xs text-muted-foreground">Daily search clicks vs impressions</p>
                    </div>
                  </div>
                  <div className="h-80 w-full font-mono text-[10px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={gscData.chartData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis yAxisId="left" stroke="oklch(0.82_0.13_85)" label={{ value: 'Clicks', angle: -90, position: 'insideLeft', fill: 'oklch(0.82_0.13_85)' }} />
                        <YAxis yAxisId="right" orientation="right" stroke="#4a90e2" label={{ value: 'Impressions', angle: 90, position: 'insideRight', fill: '#4a90e2' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'oklch(0.15_0.02_250)', borderColor: '#333', color: '#fff' }} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Line yAxisId="left" type="monotone" dataKey="clicks" name="Clicks" stroke="oklch(0.82_0.13_85)" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                        <Line yAxisId="right" type="monotone" dataKey="impressions" name="Impressions" stroke="#4a90e2" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Keyword & Page Tables Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Top Queries Table */}
                  <div className="card-surface overflow-hidden">
                    <div className="p-5 border-b border-border bg-secondary/15">
                      <h3 className="font-semibold text-sm">Top 10 Google Search Queries</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Most clicked phrases generating traffic</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/35 font-semibold text-muted-foreground">
                            <th className="p-3">Keyword Query</th>
                            <th className="p-3 w-16 text-right">Clicks</th>
                            <th className="p-3 w-20 text-right">Impressions</th>
                            <th className="p-3 w-16 text-right">CTR</th>
                            <th className="p-3 w-16 text-right">Position</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30 text-sm">
                          {(gscData.topKeywords || []).map((k: any, i: number) => (
                            <tr key={i} className="hover:bg-secondary/10 transition-colors">
                              <td className="p-3 font-medium truncate max-w-xs">{k.keyword}</td>
                              <td className="p-3 text-right text-[oklch(0.82_0.13_85)] font-semibold">{k.clicks?.toLocaleString()}</td>
                              <td className="p-3 text-right text-gray-300">{k.impressions?.toLocaleString()}</td>
                              <td className="p-3 text-right text-blue-400 font-medium">{k.ctr}</td>
                              <td className="p-3 text-right text-amber-400 font-semibold">{k.position}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Top Pages Table */}
                  <div className="card-surface overflow-hidden">
                    <div className="p-5 border-b border-border bg-secondary/15">
                      <h3 className="font-semibold text-sm">Top 10 Google Landings (URLs)</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Highest performance pages in search index</p>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-border bg-secondary/35 font-semibold text-muted-foreground">
                            <th className="p-3">Page URL Path</th>
                            <th className="p-3 w-16 text-right">Clicks</th>
                            <th className="p-3 w-20 text-right">Impressions</th>
                            <th className="p-3 w-16 text-right">CTR</th>
                            <th className="p-3 w-16 text-right">Position</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30 text-sm">
                          {(gscData.topPages || []).map((p: any, i: number) => (
                            <tr key={i} className="hover:bg-secondary/10 transition-colors">
                              <td className="p-3 font-medium font-mono text-xs text-gray-300 truncate max-w-xs" title={p.page}>
                                {p.page || "/"}
                              </td>
                              <td className="p-3 text-right text-[oklch(0.82_0.13_85)] font-semibold">{p.clicks?.toLocaleString()}</td>
                              <td className="p-3 text-right text-gray-300">{p.impressions?.toLocaleString()}</td>
                              <td className="p-3 text-right text-blue-400 font-medium">{p.ctr}</td>
                              <td className="p-3 text-right text-amber-400 font-semibold">{p.position}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ) : activeTab === "analytics" ? (
          /* ANALYTICS VIEW */
          <div className="space-y-6 animate-fade-in">
            {/* Status & Date Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/10 border border-border/60 p-4 rounded-2xl">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${gaData?.isConnected ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
                <span className="text-xs font-semibold text-foreground">
                  {gaData?.isConnected 
                    ? "Live Google Analytics GA4 Connection Active" 
                    : "Simulated Analytics (Sandbox Mode)"}
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-medium">Date Range:</span>
                <select
                  value={gaDays}
                  onChange={(e) => setGaDays(e.target.value as any)}
                  className="rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-3.5 py-2 text-xs focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground"
                >
                  <option value="7">Last 7 Days</option>
                  <option value="28">Last 28 Days</option>
                  <option value="90">Last 3 Months</option>
                </select>
              </div>
            </div>

            {gaLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[oklch(0.82_0.13_85)]" />
              </div>
            ) : gaData ? (
              <>
                {/* Active Users Widget + GA KPI Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                  {/* Real-time active counter */}
                  <div className="lg:col-span-2 card-surface p-5 border border-[oklch(0.68_0.17_245/0.2)] bg-gradient-to-br from-black/40 to-[oklch(0.2_0.025_255)] relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Activity className="w-24 h-24 text-[oklch(0.68_0.17_245)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">Real-Time Traffic</span>
                      </div>
                      <div className="text-6xl font-bold font-display text-foreground mt-4 tracking-tight">
                        {gaData.activeUsersRightNow || 0}
                      </div>
                      <div className="text-sm font-medium text-gray-300 mt-2">Active Users Right Now</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-4 border-t border-border/40 pt-3">
                      Updates automatically every 30 seconds.
                    </div>
                  </div>

                  {/* Users, Sessions, Views, Bounce Rate */}
                  <div className="lg:col-span-3 grid grid-cols-2 gap-5">
                    <div className="card-surface p-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Total Users</div>
                      <div className="text-3xl font-bold font-display text-[oklch(0.82_0.13_85)] mt-2">
                        {gaData.summary?.users?.toLocaleString() || "0"}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Unique active session users</p>
                    </div>

                    <div className="card-surface p-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Sessions</div>
                      <div className="text-3xl font-bold font-display text-foreground mt-2">
                        {gaData.summary?.sessions?.toLocaleString() || "0"}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Total visits initiated</p>
                    </div>

                    <div className="card-surface p-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Page Views</div>
                      <div className="text-3xl font-bold font-display text-blue-400 mt-2">
                        {gaData.summary?.pageViews?.toLocaleString() || "0"}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Total pages viewed</p>
                    </div>

                    <div className="card-surface p-5">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Avg. Duration</div>
                      <div className="text-3xl font-bold font-display text-amber-400 mt-2">
                        {gaData.summary?.sessionDuration || "0m 0s"}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">Average time spent on site</p>
                    </div>
                  </div>
                </div>

                {/* Daily Users Line Chart */}
                <div className="card-surface p-5 md:p-6">
                  <div>
                    <h3 className="font-semibold text-lg">Active Audience Trends</h3>
                    <p className="text-xs text-muted-foreground mb-6">Daily users and sessions timeline</p>
                  </div>
                  <div className="h-80 w-full font-mono text-[10px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={gaData.chartData || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                        <XAxis dataKey="date" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: 'oklch(0.15_0.02_250)', borderColor: '#333', color: '#fff' }} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />
                        <Line type="monotone" dataKey="users" name="Users" stroke="oklch(0.82_0.13_85)" strokeWidth={2.5} dot={false} activeDot={{ r: 6 }} />
                        <Line type="monotone" dataKey="sessions" name="Sessions" stroke="#4a90e2" strokeWidth={1.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sources & Devices Grid */}
                <div className="grid lg:grid-cols-5 gap-6">
                  {/* Traffic Sources (Bar Chart) */}
                  <div className="lg:col-span-3 card-surface p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">Traffic Acquisition Channels</h3>
                      <p className="text-xs text-muted-foreground mb-6">Percentage breakdown of users sources</p>
                    </div>
                    <div className="h-56 w-full font-mono text-[10px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={gaData.trafficSources || []} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                          <XAxis type="number" stroke="#666" suffix="%" />
                          <YAxis dataKey="name" type="category" stroke="#999" width={80} />
                          <Tooltip contentStyle={{ backgroundColor: 'oklch(0.15_0.02_250)', borderColor: '#333', color: '#fff' }} formatter={(value) => [`${value}%`, 'Share']} />
                          <Bar dataKey="value" fill="oklch(0.82_0.13_85)" radius={[0, 4, 4, 0]}>
                            {(gaData.trafficSources || []).map((entry: any, index: number) => {
                              const colors = ['oklch(0.82_0.13_85)', '#4a90e2', '#34d399', '#f59e0b'];
                              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Devices Breakdown (Pie Chart) */}
                  <div className="lg:col-span-2 card-surface p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm">Devices & Platforms</h3>
                      <p className="text-xs text-muted-foreground mb-4">Users breakdown by device type</p>
                    </div>
                    <div className="h-44 w-full flex items-center justify-center font-mono text-[10px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={gaData.devices || []}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {(gaData.devices || []).map((entry: any, index: number) => {
                              const colors = ['#4a90e2', 'oklch(0.82_0.13_85)', '#f59e0b'];
                              return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                            })}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: 'oklch(0.15_0.02_250)', borderColor: '#333', color: '#fff' }} formatter={(value) => [`${value}%`, 'Share']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {/* Pie Chart Legend */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs pt-4 border-t border-border/40 mt-4">
                      {(gaData.devices || []).map((d: any, index: number) => {
                        const bgColors = ['bg-[#4a90e2]', 'bg-[oklch(0.82_0.13_85)]', 'bg-[#f59e0b]'];
                        return (
                          <div key={index} className="flex flex-col items-center">
                            <div className="flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${bgColors[index % bgColors.length]}`} />
                              <span className="font-medium text-gray-300">{d.name}</span>
                            </div>
                            <span className="font-semibold mt-0.5">{d.value}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Top Visited Pages Table */}
                <div className="card-surface overflow-hidden">
                  <div className="p-5 border-b border-border bg-secondary/15">
                    <h3 className="font-semibold text-sm">Most Visited Pages (GA4 Pageviews)</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Top performing articles and services pages</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-border bg-secondary/35 font-semibold text-muted-foreground">
                          <th className="p-3">Page Path & Name</th>
                          <th className="p-3 w-32 text-right">Views</th>
                          <th className="p-3 w-32 text-right">Unique Visitors</th>
                          <th className="p-3 w-40 text-right">Traffic Share</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/30 text-sm">
                        {(gaData.topPages || []).map((p: any, i: number) => {
                          const percentage = Math.round((p.views / (gaData.summary?.pageViews || 1)) * 100);
                          return (
                            <tr key={i} className="hover:bg-secondary/10 transition-colors">
                              <td className="p-3 font-medium truncate max-w-lg">{p.page}</td>
                              <td className="p-3 text-right text-[oklch(0.82_0.13_85)] font-semibold">{p.views?.toLocaleString()}</td>
                              <td className="p-3 text-right text-gray-300">{p.visitors?.toLocaleString()}</td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2.5">
                                  <span className="font-mono text-gray-400 w-8">{percentage}%</span>
                                  <div className="w-16 h-1.5 rounded-full bg-secondary/60 overflow-hidden border border-border/40">
                                    <div className="h-full bg-[oklch(0.82_0.13_85)] rounded-full" style={{ width: `${percentage}%` }} />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        ) : activeTab === "settings" ? (
          /* INTEGRATIONS / SETTINGS VIEW */
          <div className="card-surface p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="border-b border-border pb-5">
              <h2 className="text-xl font-bold font-display text-foreground">Google API Integrations</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Configure your API credentials to sync live Google Search Console and Google Analytics (GA4) data directly to your dashboard.
              </p>
            </div>

            {/* Connection Status Banner */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
              isGoogleConnected 
                ? "bg-green-950/20 border-green-900/40 text-green-400" 
                : "bg-amber-950/20 border-amber-900/40 text-amber-400"
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg shrink-0 ${
                  isGoogleConnected ? "bg-green-900/30 text-green-400" : "bg-amber-900/30 text-amber-400"
                }`}>
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    {isGoogleConnected ? "Google Accounts Authorized" : "OAuth Connection Required"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isGoogleConnected 
                      ? "Your dashboard has active Google OAuth access tokens to query live Search Console & Analytics APIs." 
                      : "Currently running in simulated sandbox mode. Connect your Google account to fetch live metrics."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isGoogleConnected ? (
                  <>
                    <button
                      type="button"
                      onClick={handleTestConnection}
                      disabled={settingsSaving}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-green-900/30 hover:bg-green-900/50 border border-green-900/40 text-green-400 cursor-pointer transition-colors"
                    >
                      Test Connection
                    </button>
                    <button
                      type="button"
                      onClick={handleDisconnectGoogle}
                      disabled={settingsSaving}
                      className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 cursor-pointer transition-colors"
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleConnectGoogle}
                    className="btn-gold text-xs px-4 py-2 cursor-pointer"
                  >
                    Connect Google Account
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Search Console Credentials */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-[oklch(0.82_0.13_85)] border-b border-border/40 pb-2">
                    Google Search Console
                  </h3>
                  
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Site URL or Domain Property ID
                    </label>
                    <input
                      type="text"
                      value={gscSiteUrl}
                      onChange={(e) => setGscSiteUrl(e.target.value)}
                      placeholder="e.g. sc-domain:hingolmarketing.com or https://hingolmarketing.com/"
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Must match the Property URL prefix or sc-domain syntax in Google Search Console.
                    </p>
                  </div>
                </div>

                {/* Google Analytics GA4 Credentials */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-[oklch(0.82_0.13_85)] border-b border-border/40 pb-2">
                    Google Analytics (GA4)
                  </h3>
                  
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      GA4 Property ID
                    </label>
                    <input
                      type="text"
                      value={gaPropertyId}
                      onChange={(e) => setGaPropertyId(e.target.value)}
                      placeholder="e.g. 123456789 (numeric ID only)"
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Found in GA4 Admin &rarr; Property Settings &rarr; Property Details (numeric ID).
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Measurement ID / Stream ID
                    </label>
                    <input
                      type="text"
                      value={gaMeasurementId}
                      onChange={(e) => setGaMeasurementId(e.target.value)}
                      placeholder="e.g. G-XXXXXXXXXX"
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Found in GA4 Admin &rarr; Data Streams &rarr; Stream Details.
                    </p>
                  </div>
                </div>
              </div>

              {/* OAuth Client Configuration */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-[oklch(0.82_0.13_85)] border-b border-border/40 pb-2">
                  OAuth 2.0 Web Application Credentials
                </h3>
                <p className="text-xs text-muted-foreground">
                  Create OAuth 2.0 credentials in the Google Cloud Console with redirect URI set to: <code className="bg-black/40 border border-border px-1.5 py-0.5 rounded text-[oklch(0.82_0.13_85)]">{typeof window !== "undefined" ? window.location.origin + "/admin" : "https://yourdomain.com/admin"}</code>
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Client ID
                    </label>
                    <input
                      type="text"
                      value={googleClientId}
                      onChange={(e) => setGoogleClientId(e.target.value)}
                      placeholder="e.g. 123456789-abc.apps.googleusercontent.com"
                      autoComplete="new-client-id"
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Client Secret
                    </label>
                    <input
                      type="password"
                      value={googleClientSecret}
                      onChange={(e) => setGoogleClientSecret(e.target.value)}
                      placeholder="••••••••••••••••"
                      autoComplete="new-password"
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-border/50 pt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("posts")}
                  className="btn-ghost text-xs px-5 py-2.5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={settingsSaving}
                  className="btn-gold cursor-pointer text-xs px-6 py-2.5 flex items-center gap-2"
                >
                  {settingsSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving Settings...
                    </>
                  ) : (
                    "Save & Apply Settings"
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* EDITOR FORM VIEW */
          <div className="card-surface p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-border pb-5 mb-6">
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5 text-[oklch(0.82_0.13_85)]" />
                <span className="font-semibold text-lg">
                  {editingPost ? "Edit Article Details" : "Draft a New Article"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("posts")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Discard & Exit
              </button>
            </div>

            <form onSubmit={handleSavePost} className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Left col: Core Fields */}
                <div className="sm:col-span-2 space-y-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Top SEO Trends in Dubai for 2026"
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Short Excerpt / Card Preview *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a brief, scroll-stopping description to show on the main blog feed page..."
                      className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35 resize-y"
                    />
                  </div>
                </div>

                {/* Right col: Taxonomy & Preview Details */}
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                        Category Tag
                      </label>

                      {userProfile?.role === "super_admin" && !DEFAULT_CATEGORIES.includes(category) && category && (
                        <button
                          type="button"
                          disabled={catActionLoading}
                          onClick={handleDeleteCategory}
                          className="text-[10px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
                          title="Delete active custom category"
                        >
                          <Trash2 className="w-3 h-3" /> Delete Custom
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex-1 rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {userProfile?.role === "super_admin" && (
                      showCustomCat ? (
                        <div className="mt-2 p-3 bg-secondary/30 border border-border rounded-xl space-y-2 animate-fade-in">
                          <input
                            type="text"
                            value={newCatName}
                            onChange={(e) => setNewCatName(e.target.value)}
                            placeholder="Type new category..."
                            className="w-full rounded-lg bg-[oklch(0.18_0.02_252)] border border-border px-3 py-2 text-xs focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground"
                          />
                          <div className="flex justify-end gap-2 text-[10px]">
                            <button
                              type="button"
                              onClick={() => setShowCustomCat(false)}
                              className="px-2 py-1 border border-border rounded text-muted-foreground cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={catActionLoading}
                              onClick={handleAddCustomCategory}
                              className="px-2 py-1 bg-[oklch(0.82_0.13_85)] text-[oklch(0.15_0.02_250)] rounded font-semibold cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setShowCustomCat(true)}
                          className="text-xs text-[oklch(0.82_0.13_85)] hover:underline flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" /> Custom Category...
                        </button>
                      )
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      Publishing Status
                    </label>
                    <div className="space-y-3 bg-[oklch(0.2_0.025_255)] border border-border p-4 rounded-xl">
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPublishMode("draft")}
                          className={`px-3 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${publishMode === "draft"
                              ? "bg-secondary text-foreground border-border/80"
                              : "text-muted-foreground border-border/20 hover:border-border/55 hover:text-foreground"
                            }`}
                        >
                          Draft
                        </button>
                        <button
                          type="button"
                          onClick={() => setPublishMode("immediate")}
                          className={`px-3 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${publishMode === "immediate"
                              ? "bg-[oklch(0.82_0.13_85/0.1)] text-[oklch(0.82_0.13_85)] border-[oklch(0.82_0.13_85/0.3)]"
                              : "text-muted-foreground border-border/20 hover:border-border/55 hover:text-foreground"
                            }`}
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          onClick={() => setPublishMode("schedule")}
                          className={`px-3 py-2.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${publishMode === "schedule"
                              ? "bg-amber-950/20 text-amber-400 border-amber-900/40"
                              : "text-muted-foreground border-border/20 hover:border-border/55 hover:text-foreground"
                            }`}
                        >
                          Schedule
                        </button>
                      </div>

                      {publishMode === "schedule" && (
                        <div className="pt-2 animate-fade-in space-y-2">
                          <label className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                            Pick Publish Date & Time
                          </label>
                          <input
                            type="datetime-local"
                            required={publishMode === "schedule"}
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            className="w-full rounded-lg bg-[oklch(0.18_0.02_252)] border border-border px-3 py-2 text-xs focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground [color-scheme:dark]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover Image Upload Area */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Featured Cover Image
                </label>

                <div className="grid sm:grid-cols-4 gap-4 items-center">
                  <div className="sm:col-span-3">
                    <div className="border border-dashed border-border rounded-xl p-5 text-center hover:border-[oklch(0.82_0.13_85/0.5)] transition-colors relative cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <ImageIcon className="w-7 h-7 text-muted-foreground mx-auto stroke-1 mb-1" />
                      <div className="text-sm font-medium">
                        {imageFile ? imageFile.name : "Select cover image"}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        PNG, JPG, WEBP, or SVG up to 5MB (saved to Supabase Storage)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    {imageFile ? (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border bg-black">
                        <img
                          src={URL.createObjectURL(imageFile)}
                          alt="Upload preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : existingImageUrl ? (
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-border bg-black">
                        <img
                          src={existingImageUrl}
                          alt="Current cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-xl border border-border/50 bg-[oklch(0.18_0.02_252)] flex flex-col items-center justify-center text-muted-foreground/45 text-[10px] text-center p-2">
                        <ImageIcon className="w-5 h-5 stroke-1 mb-1" />
                        No Cover
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Rich Content Text Area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                    Full Article Body (Markdown or Rich Text) *
                  </label>

                  {/* Toolbar */}
                  <button
                    type="button"
                    onClick={openLinkModal}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-secondary hover:bg-secondary/80 text-foreground border border-border/60 rounded-lg transition-colors cursor-pointer"
                    title="Insert hyperlink (Ctrl+K)"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[oklch(0.82_0.13_85)]" />
                    <span>Insert Link</span>
                  </button>
                </div>

                <textarea
                  id="content-editor"
                  required
                  rows={15}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  placeholder="## Introduction&#10;Write the core content of the article here. You can use HTML markup or Markdown format.&#10;&#10;### Section Heading&#10;Add descriptive detail..."
                  className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground font-mono placeholder:text-muted-foreground/35 resize-y"
                />
              </div>

              {/* MULTIPLE IMAGES IN BLOG CONTENT */}
              <div className="card-surface p-5 border border-border/50">
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4">
                  <div>
                    <h3 className="font-semibold text-sm">Inline Article Images</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Upload multiple helper images to copy their public URLs and paste them as markdown links inside your article content.
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      disabled={galleryUploading}
                      className="btn-ghost text-xs py-2 px-4 cursor-pointer flex items-center gap-1.5"
                    >
                      {galleryUploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" /> Upload Images
                        </>
                      )}
                    </button>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleMultipleImagesUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={galleryUploading}
                    />
                  </div>
                </div>

                {contentImages.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    No inline images uploaded yet. Use the upload button above to add assets.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {contentImages.map((url, idx) => (
                      <div key={idx} className="group relative border border-border rounded-xl bg-black/40 overflow-hidden flex flex-col p-2">
                        <div className="aspect-square rounded-lg overflow-hidden border border-border/30 bg-black relative">
                          <img
                            src={url}
                            alt={`Gallery image ${idx}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex gap-1 mt-2">
                          <button
                            type="button"
                            onClick={() => copyUrlToClipboard(url)}
                            className="flex-1 flex items-center justify-center py-1.5 bg-secondary hover:bg-secondary/80 text-[10px] rounded border border-border/40 cursor-pointer gap-1"
                            title="Copy image URL to clipboard"
                          >
                            <Copy className="w-2.5 h-2.5" /> Copy
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteContentImage(url)}
                            className="p-1.5 bg-red-950/20 hover:bg-red-950/60 text-red-400 border border-red-900/40 rounded cursor-pointer"
                            title="Delete image"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SEO METADATA SECTION */}
              <div className="card-surface p-6 border border-border/50 space-y-5">
                <div className="border-b border-border/40 pb-3">
                  <h3 className="font-semibold text-sm flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-[oklch(0.82_0.13_85)]" /> Search Engine Optimization (SEO)
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Customize titles, tags, and description tags for optimal ranking on Google search results.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-4">
                    {/* SEO Title */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                          SEO Page Title
                        </label>
                        <span className={`text-[10px] ${seoTitle.length > 60 ? "text-red-400 font-semibold" : "text-muted-foreground"}`}>
                          {seoTitle.length}/60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Customize search engine title..."
                        className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Recommended: 50-60 characters
                      </p>
                    </div>

                    {/* SEO Description */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                          Meta Description
                        </label>
                        <span className={`text-[10px] ${seoDescription.length > 160 ? "text-red-400 font-semibold" : "text-muted-foreground"}`}>
                          {seoDescription.length}/160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="Customize search snippet meta description..."
                        className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35 resize-y"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">
                        Recommended: 120-160 characters
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 flex flex-col">
                    {/* SEO Keywords tag input */}
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                        Search Keywords
                      </label>

                      <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={handleAddKeyword}
                        placeholder="Type keyword and press Enter..."
                        className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                      />

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {keywordsList.length === 0 ? (
                          <span className="text-[10px] text-muted-foreground/50">No search keywords defined.</span>
                        ) : (
                          keywordsList.map((kw, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold bg-secondary px-2.5 py-1 rounded-full border border-border"
                            >
                              {kw}
                              <button
                                type="button"
                                onClick={() => handleRemoveKeyword(kw)}
                                className="text-muted-foreground hover:text-foreground cursor-pointer font-bold ml-0.5"
                              >
                                &times;
                              </button>
                            </span>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Google Search Live Preview */}
                    <div className="flex-1 flex flex-col justify-end mt-4 sm:mt-0">
                      <div className="border border-border/80 rounded-xl p-4 bg-black/30 flex flex-col">
                        <div className="text-[10px] text-muted-foreground font-semibold mb-2 flex items-center gap-1">
                          <Search className="w-3 h-3 text-[oklch(0.82_0.13_85)]" /> Google Desktop Search Preview
                        </div>

                        <div className="text-left font-sans space-y-1">
                          {/* URL */}
                          <div className="text-[11px] text-gray-400 truncate">
                            https://hingolmarketing.com › blog › {generateSlug(title) || "url-slug"}
                          </div>

                          {/* Title */}
                          <div className="text-lg font-medium text-blue-400 hover:underline cursor-pointer leading-tight truncate">
                            {seoTitle || title || "Blog Post Title | Hingol Marketing"}
                          </div>

                          {/* Description */}
                          <div className="text-[13px] text-gray-300 leading-snug line-clamp-2">
                            {seoDescription || excerpt || "Write an excerpt or custom SEO description to preview how your search snippet will appear in Google searches."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="border-t border-border/50 pt-6 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("posts")}
                  className="btn-ghost text-xs px-5 py-2.5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editorLoading}
                  className="btn-gold cursor-pointer text-xs px-6 py-2.5 flex items-center gap-2"
                >
                  {editorLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save & Publish"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
      <Toaster position="top-right" theme="dark" richColors />

      {uiError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
          <div className="card-surface p-6 max-w-lg w-full border border-red-900/30 shadow-2xl relative space-y-4 animate-scale-up">
            <button
              type="button"
              onClick={handleCloseErrorModal}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-red-400 shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  {uiError.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {uiError.message}
                </p>
              </div>
            </div>

            {uiError.sqlInstruction && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  SQL Script to run in Supabase SQL Editor:
                </div>
                <div className="relative">
                  <pre className="text-xs bg-black/40 border border-border p-4 rounded-xl font-mono text-gray-300 overflow-x-auto max-h-48 select-all">
                    {(uiError as any).settingsSql ? `CREATE TABLE IF NOT EXISTS public.admin_settings (
  id bigint primary key generated always as identity,
  setting_key text not null unique,
  setting_value text,
  updated_at timestamp with time zone default now()
);

INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('gsc_site_url', null),
('ga_measurement_id', null),
('ga_property_id', null),
('google_client_id', null),
('google_client_secret', null),
('google_refresh_token', null),
('google_access_token', null)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable public select access for GA4 tracking injection
CREATE POLICY "Allow public select on admin_settings"
  ON public.admin_settings
  FOR SELECT
  USING (true);` : `CREATE TABLE public.admin_users (
  id bigint primary key generated always as identity,
  email text not null unique,
  password text not null,
  role text not null default 'editor',
  name text,
  created_at timestamp with time zone default now(),
  is_active boolean default true
);`}
                  </pre>
                  <button
                    type="button"
                    onClick={() => {
                      const textToCopy = (uiError as any).settingsSql ? `CREATE TABLE IF NOT EXISTS public.admin_settings (
  id bigint primary key generated always as identity,
  setting_key text not null unique,
  setting_value text,
  updated_at timestamp with time zone default now()
);

INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('gsc_site_url', null),
('ga_measurement_id', null),
('ga_property_id', null),
('google_client_id', null),
('google_client_secret', null),
('google_refresh_token', null),
('google_access_token', null)
ON CONFLICT (setting_key) DO NOTHING;

-- Enable public select access for GA4 tracking injection
CREATE POLICY "Allow public select on admin_settings"
  ON public.admin_settings
  FOR SELECT
  USING (true);` : `CREATE TABLE public.admin_users (
  id bigint primary key generated always as identity,
  email text not null unique,
  password text not null,
  role text not null default 'editor',
  name text,
  created_at timestamp with time zone default now(),
  is_active boolean default true
);`;
                      navigator.clipboard.writeText(textToCopy);
                      toast.success("SQL copied to clipboard!");
                    }}
                    className="absolute top-3 right-3 px-2.5 py-1.5 bg-secondary hover:bg-secondary/80 text-[10px] rounded-lg border border-border/60 cursor-pointer flex items-center gap-1 font-semibold text-foreground transition-colors"
                  >
                    <Copy className="w-3 h-3 text-[oklch(0.82_0.13_85)]" /> Copy SQL
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  💡 <strong>How to fix:</strong> Go to your <strong>Supabase Dashboard</strong> &rarr; click on <strong>SQL Editor</strong> &rarr; click <strong>New Query</strong> &rarr; paste this SQL &rarr; click <strong>Run</strong>. {(uiError as any).settingsSql ? "This will create the settings schema and enable analytics mapping." : "After that, run node create_admin_user.js in your project directory."}
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleCloseErrorModal}
                className="btn-gold px-5 py-2 cursor-pointer text-xs font-semibold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}

      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="card-surface p-6 max-w-md w-full border border-border/80 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowLinkModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-[oklch(0.82_0.13_85)]">
              <LinkIcon className="w-4 h-4" /> Insert Hyperlink
            </h3>

            <form onSubmit={handleInsertLink} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Link URL
                </label>
                <input
                  type="text"
                  required
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link Display Text"
                  className="w-full rounded-xl bg-[oklch(0.2_0.025_255)] border border-border px-4 py-3 text-sm focus:outline-none focus:border-[oklch(0.68_0.17_245)] text-foreground placeholder:text-muted-foreground/35"
                />
              </div>

              <div className="flex items-center gap-3 bg-[oklch(0.2_0.025_255)] border border-border p-3.5 rounded-xl">
                <input
                  type="checkbox"
                  id="target-blank"
                  checked={linkTargetBlank}
                  onChange={(e) => setLinkTargetBlank(e.target.checked)}
                  className="w-4 h-4 rounded text-[oklch(0.82_0.13_85)] border-border bg-background focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="target-blank" className="text-sm font-medium cursor-pointer select-none">
                  Open in a new tab (target="_blank")
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="btn-ghost text-xs px-4 py-2 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold text-xs px-5 py-2 cursor-pointer"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
