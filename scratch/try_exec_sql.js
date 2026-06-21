import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgmrndeeynprycxrbzgt.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function run() {
  const sql = `
CREATE TABLE IF NOT EXISTS public.admin_settings (
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

-- Enable public select access
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Allow public select on admin_settings'
  ) THEN
    CREATE POLICY "Allow public select on admin_settings" ON public.admin_settings FOR SELECT USING (true);
  END IF;
END
$$;
`;

  try {
    console.log("Trying to execute SQL via generic RPC functions...");
    
    // Try common RPC names for executing SQL
    const commonRpcs = ['exec_sql', 'execute_sql', 'sql', 'run_sql'];
    for (const rpcName of commonRpcs) {
      console.log(`Trying RPC: ${rpcName}...`);
      const { data, error } = await supabaseAdmin.rpc(rpcName, { query: sql, sql: sql });
      if (!error) {
        console.log(`SUCCESS! Executed SQL using RPC ${rpcName}`);
        console.log("Result:", data);
        return;
      } else {
        console.log(`Failed for RPC ${rpcName}:`, error.message);
      }
    }
    console.log("No common SQL execution RPC function found in Supabase project.");
  } catch (err) {
    console.error("Execution exception:", err.message);
  }
}

run();
