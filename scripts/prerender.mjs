import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');
const PORT = 5173;

// Create a simple static file server
function startServer() {
  const server = createServer((request, response) => {
    return handler(request, response, {
      public: distPath,
      cleanUrls: true,
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`✓ Preview server running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('Starting pre-render process...');

  // Start the preview server
  const server = await startServer();

  try {
    // Launch puppeteer
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Navigate to the landing page
    console.log('Navigating to landing page...');
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
    });

    // Wait a bit more for React to fully hydrate and render
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Get the rendered HTML
    console.log('Extracting rendered HTML...');
    const html = await page.content();

    // Close browser
    await browser.close();
    console.log('✓ Browser closed');

    // Save the pre-rendered HTML
    const indexPath = join(distPath, 'index.html');
    writeFileSync(indexPath, html, 'utf-8');
    console.log(`✓ Pre-rendered HTML saved to ${indexPath}`);

  } catch (error) {
    console.error('Error during pre-rendering:', error);
    process.exit(1);
  } finally {
    // Close the server
    server.close();
    console.log('✓ Server closed');
    console.log('Pre-rendering complete!');
  }
}

prerender();
