const fs = require('fs');

async function updateRSS() {
    const CHANNEL_ID = "UCeHc6r9TtpQaRTUDL-WRcMw";
    const YT_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    try {
        const response = await fetch(YT_URL, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });
        
        if (!response.ok) {
            throw new Error(`YouTube API returned status: ${response.status}`);
        }

        const fullXml = await response.text();

        fs.writeFileSync('rss.xml', fullXml);
        console.log("✅ Đã lọc và tạo file rss.xml thành công!");
    } catch (error) {
        console.error("❌ Lỗi:", error.message);
        process.exit(1);
    }
}

updateRSS();