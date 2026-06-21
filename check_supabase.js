const url = "https://dgmrndeeynprycxrbzgt.supabase.co/rest/v1/";
const apikey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

async function run() {
  try {
    const res = await fetch(url, {
      headers: {
        "apikey": apikey,
        "Authorization": `Bearer ${apikey}`
      }
    });
    const spec = await res.json();
    console.log("TABLES FOUND IN SCHEMA:", Object.keys(spec.paths));
    if (spec.definitions && spec.definitions.blog_posts) {
      console.log("blog_posts columns:", Object.keys(spec.definitions.blog_posts.properties));
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
