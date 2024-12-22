import puppeteer from 'puppeteer';
import fs from 'fs';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch(
{
    //headless: false, // Set to 'false' for non-headless mode (for debugging)
    //args: ['--no-sandbox', '--disable-setuid-sandbox'] // Necessary for some environments
});
const page = await browser.newPage();

// Set a user-agent string to avoid getting blocked by Instagram
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

// Navigate to Instagram login page
await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

// Wait for the login form to load
await page.waitForSelector('input[name="username"]');

// Enter username and password
await page.type('input[name="username"]', 'younglionrasmus');  // Replace 'your_username' with your Instagram username
await page.type('input[name="password"]', 'Fgzpz3XGQ8ZKvh2');  // Replace 'your_password' with your Instagram password

// Click the login button
await page.click('button[type="submit"]');

// Wait for the page to load after login
await page.waitForNavigation({ waitUntil: 'networkidle2' });

// Navigate the page to a URL and wait for it to load
await page.goto('https://www.instagram.com/ethkyiv_ua/', { waitUntil: 'networkidle2' });

// Set screen size.
await page.setViewport({width: 1080, height: 1024});

// Wait for the page to load completely
await page.waitForSelector('body'); // Ensures the body element is loaded

// Get the full HTML content of the page
const htmlContent = await page.content();

// Save the HTML content to a file
fs.writeFileSync('instagram_page.html', htmlContent, 'utf8');

console.log('HTML content saved to "instagram_page.html"');

// // Get the text content of the <h1> element
// const h1Text = await page.evaluate(() => {
//     const h1Element = document.querySelector('h1'); // Select the <h1> element
//     return h1Element ? h1Element.textContent.trim() : null; // Extract and return the text, or null if not found
// });

await browser.close();