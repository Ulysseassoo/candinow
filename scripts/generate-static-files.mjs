import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '../dist');

const siteUrl = 'https://candinow.com';

// Generate sitemap.xml
function generateSitemap() {
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
}

// Generate robots.txt
function generateRobotsTxt() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  const robotsPath = join(distPath, 'robots.txt');
  writeFileSync(robotsPath, robotsTxt, 'utf-8');
  console.log(`✓ robots.txt generated at ${robotsPath}`);
}

// Main function
async function generateStaticFiles() {
  console.log('Generating static files for SEO...');

  try {
    generateSitemap();
    generateRobotsTxt();
    console.log('✓ All static files generated successfully!');
  } catch (error) {
    console.error('Error generating static files:', error);
    // Don't fail the build if this fails
    process.exit(0);
  }
}

generateStaticFiles();
