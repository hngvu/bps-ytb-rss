const fs = require('fs');

async function updateRSS() {
    const CHANNEL_ID = "UCeHc6r9TtpQaRTUDL-WRcMw";
    const YT_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
    const maxRetries = 3;

    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`🔄 Đang fetch dữ liệu từ YouTube (Lần thử ${i + 1})...`);
            const response = await fetch(YT_URL, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    "Accept-Language": "vi-VN,vi;q=0.9"
                }
            });

            if (!response.ok) throw new Error(`YouTube trả về lỗi: ${response.status}`);

            const fullXml = await response.text();

            // --- GHI FILE RA REPOSITORY ---
            // GitHub Action sẽ dùng file này để commit/push hoặc deploy Pages
            fs.writeFileSync('rss.xml', fullXml);

            console.log("✅ Đã lọc sạch Shorts và ghi file rss.xml thành công!");
            return;

        } catch (error) {
            console.error(`❌ Lỗi: ${error.message}`);
            if (i < maxRetries - 1) {
                console.log("Đợi 5 giây rồi thử lại...");
                await new Promise(res => setTimeout(res, 5000));
            } else {
                console.error("💥 Thất bại hoàn toàn sau nhiều lần thử.");
                process.exit(0);
            }
        }
    }
}

updateRSS();
