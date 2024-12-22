import puppeteer from 'puppeteer';

const scrapeInstagramPosts = async (username, maxPosts = 10) => {
    const url = `https://www.instagram.com/${username}/`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Переходимо на сторінку профілю користувача
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Чекаємо завантаження основних елементів сторінки
        await page.waitForSelector('article div img', { timeout: 10000 });

        // Витягуємо дані публікацій
        const posts = await page.evaluate((maxPosts) => {
            const nodes = document.querySelectorAll('article div div div div a');
            return Array.from(nodes)
                .slice(0, maxPosts)
                .map(node => {
                    const postUrl = node.href;
                    const textElement = node.querySelector('img[alt]');
                    const text = textElement ? textElement.alt : 'No text';
                    return { postUrl, text };
                });
        }, maxPosts);

        console.log('Posts:', posts);
        return posts;
    } catch (error) {
        console.error('Error:', error);
        return [];
    } finally {
        await browser.close();
    }
};

// Використання функції
const username = 'ethkyiv_ua'; // Замініть на ім'я користувача
scrapeInstagramPosts(username, 10).then(posts => {
    console.log('Scraped Posts:', posts);
});
