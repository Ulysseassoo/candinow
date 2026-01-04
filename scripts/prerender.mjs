import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');
const PORT = 5173;

// Check if we're running on Vercel
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV;

// Check if dist folder exists
if (!existsSync(distPath)) {
  console.error('❌ Error: dist folder does not exist. Please run "bun run build" first.');
  process.exit(1);
}

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

// Generate static files (sitemap, robots.txt)
async function generateStaticFiles() {
  console.log('\nGenerating static files...');

  try {
    const siteUrl = 'https://candinow.com';

    // Generate sitemap.xml
    const routes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/app', priority: '0.9', changefreq: 'daily' },
      { path: '/app/dashboard', priority: '0.8', changefreq: 'weekly' },
      { path: '/app/settings', priority: '0.7', changefreq: 'monthly' },
      { path: '/app/actions', priority: '0.8', changefreq: 'daily' },
      { path: '/app/feedback', priority: '0.6', changefreq: 'monthly' },
    ];

    const lastmod = new Date().toISOString().split('T')[0];
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

    const sitemapPath = join(distPath, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemap, 'utf-8');
    console.log(`✓ Sitemap generated at ${sitemapPath}`);

    // Generate robots.txt
    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

    const robotsPath = join(distPath, 'robots.txt');
    writeFileSync(robotsPath, robotsTxt, 'utf-8');
    console.log(`✓ robots.txt generated at ${robotsPath}`);
  } catch (error) {
    console.warn('Warning: Failed to generate static files:', error.message);
  }
}

async function prerender() {
  console.log('Starting pre-render process...');

  // Don't run Puppeteer on Vercel (it's too resource intensive)
  if (isVercel) {
    console.log('⚠️  Skipping Puppeteer pre-rendering on Vercel (use build command instead)');
    await generateStaticFiles();
    return;
  }

  // Start the preview server
  const server = await startServer();

  try {
    // Launch puppeteer
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('✓ Browser launched');

    const page = await browser.newPage();

    // Navigate to the landing page
    console.log('Navigating to landing page...');
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait a bit more for React to fully hydrate and render
    console.log('Waiting for React hydration...');
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

    // Generate static files
    await generateStaticFiles();

  } catch (error) {
    console.error('❌ Error during pre-rendering:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  } finally {
    // Close the server
    server.close();
    console.log('✓ Server closed');
    console.log('\n✅ Pre-rendering complete!');
  }
}

prerender().catch((error) => {
  console.error('❌ Pre-rendering failed:', error.message);
  process.exit(1);
});
