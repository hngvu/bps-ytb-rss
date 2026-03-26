const fs = require('fs');

async function updateRSS() {
    const CHANNEL_ID = "UCeHc6r9TtpQaRTUDL-WRcMw";
    const YT_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    const maxRetries = 5;
    for (let i = 0; i < maxRetries; i++) {
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
            return; // Success, exit the function
        } catch (error) {
            console.error(`❌ Lần thử ${i + 1} thất bại:`, error.message);
            if (i < maxRetries - 1) {
                console.log("Đang thử lại sau 3 giây...");
                await new Promise(resolve => setTimeout(resolve, 3000));
            } else {
                console.error("❌ Đã thử 5 lần nhưng vẫn thất bại do YouTube server!");
                console.log("⚠️ Sử dụng file rss.xml cũ (fallback) để giữ link không bị sập.");
                process.exit(0);
            }
        }
    }
}

updateRSS();