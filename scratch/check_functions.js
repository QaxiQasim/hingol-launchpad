import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgmrndeeynprycxrbzgt.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function getSetting(key) {
  try {
    const { data, error } = await supabaseAdmin
      .from("admin_settings")
      .select("setting_value")
      .eq("setting_key", key)
      .maybeSingle();
    if (error) {
      console.log(`getSetting error for ${key}:`, error.message);
      return null;
    }
    return data ? data.setting_value : null;
  } catch (err) {
    console.log(`getSetting exception for ${key}:`, err.message);
    return null;
  }
}

async function getValidAccessToken() {
  const clientId = await getSetting("google_client_id");
  const clientSecret = await getSetting("google_client_secret");
  const refreshToken = await getSetting("google_refresh_token");

  if (!clientId || !clientSecret || !refreshToken) return null;
  return null;
}

async function testGSC() {
  try {
    console.log("Testing GSC fallback logic...");
    const siteUrl = await getSetting("gsc_site_url");
    const accessToken = await getValidAccessToken();

    const daysNum = 28;
    const isConnected = !!(siteUrl && accessToken);
    console.log("isConnected:", isConnected);

    // FALLBACK
    const chartData = [];
    const daysCount = daysNum;
    
    let baseClicks = 65;
    let baseImpressions = 1200;
    let clicksSum = 0;
    let impressionsSum = 0;
    let totalCtrSum = 0;
    let totalPosSum = 0;

    for (let i = daysCount; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayOfWeek = d.getDay();
      
      const factor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.1; 
      const randClicks = Math.round((baseClicks + Math.random() * 20 - 10) * factor);
      const randImp = Math.round((baseImpressions + Math.random() * 300 - 150) * factor);
      const randCtr = randClicks / randImp;
      const randPos = 12.0 + Math.random() * 1.5 - 0.75;

      clicksSum += randClicks;
      impressionsSum += randImp;
      totalCtrSum += randCtr;
      totalPosSum += randPos;

      chartData.push({
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        clicks: randClicks,
        impressions: randImp
      });
    }

    const overallCtr = (clicksSum / impressionsSum) * 100;
    const overallPos = totalPosSum / (daysCount + 1);

    const mockKeywords = [
      { keyword: "seo services dubai", clicks: Math.round(clicksSum * 0.15), impressions: Math.round(impressionsSum * 0.12), ctr: "6.8%", position: "2.4" }
    ];

    const mockPages = [
      { page: "/", clicks: Math.round(clicksSum * 0.40), impressions: Math.round(impressionsSum * 0.35), ctr: "6.2%", position: "3.5" }
    ];

    console.log("Mock GSC Success! Clicks count:", clicksSum);
    return {
      success: true,
      isConnected: false,
      summary: {
        clicks: clicksSum,
        impressions: impressionsSum,
        ctr: overallCtr.toFixed(2) + "%",
        position: overallPos.toFixed(1)
      },
      chartData,
      topKeywords: mockKeywords,
      topPages: mockPages
    };
  } catch (err) {
    console.error("GSC error:", err.message);
    return { success: false, error: err.message };
  }
}

async function testGA4() {
  try {
    console.log("Testing GA4 fallback logic...");
    const propertyId = await getSetting("ga_property_id");
    const accessToken = await getValidAccessToken();

    const daysNum = 28;
    const isConnected = !!(propertyId && accessToken);
    console.log("isConnected:", isConnected);

    const daysCount = daysNum;
    const dailyUsersData = [];
    let baseUsers = 130;
    let totalUsersSum = 0;
    let totalSessionsSum = 0;
    let totalPageViewsSum = 0;
    let sumBounceRate = 0;
    let sumDuration = 0;

    for (let i = daysCount; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayOfWeek = d.getDay();
      const factor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.65 : 1.15;

      const dailyUsers = Math.round((baseUsers + Math.random() * 30 - 15) * factor);
      const dailySessions = Math.round(dailyUsers * (1.3 + Math.random() * 0.1));
      const dailyPageViews = Math.round(dailySessions * (2.1 + Math.random() * 0.3));
      const dailyBounce = 40 + Math.random() * 6 - 3;
      const dailyDuration = 110 + Math.random() * 20 - 10;

      totalUsersSum += dailyUsers;
      totalSessionsSum += dailySessions;
      totalPageViewsSum += dailyPageViews;
      sumBounceRate += dailyBounce;
      sumDuration += dailyDuration;

      dailyUsersData.push({
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        users: dailyUsers,
        sessions: dailySessions
      });
    }

    console.log("Mock GA4 Success! Users count:", totalUsersSum);
  } catch (err) {
    console.error("GA4 error:", err.message);
  }
}

async function runAll() {
  await testGSC();
  await testGA4();
}
runAll();
