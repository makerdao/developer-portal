const fs = require('fs');
const matter = require('gray-matter');
const globby = require('globby');
const prettier = require('prettier');

(async () => {
    // const url = 'http://localhost:3000/';
    const url = 'developer-portal-git-data-fetch-implementation-markdown.mkr-js-prod.vercel.app/';
    const guidesPath = 'content/resources/guides';
    const docsPath = 'content/resources/documentation';

    const guides = await globby([`${guidesPath}/*.md`]);

    const docs = (await globby([`${docsPath}/*.md`])).map(document => {
        const md = fs.readFileSync(`${document}`, 'utf8');
        const { data } = matter(md);
        return {page: document, module: data.parent};
    });

    const sitemap = `
            <?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${guides
                .map(page => {
                    const path = page
                    .replace(`${guidesPath}`, 'guides')
                    .replace('.js', '')
                    .replace('.md', '');
                    const route = path === '/index' ? '' : path;
                    return `
                            <url>
                                <loc>${`${url}${route}`}</loc>
                            </url>
                        `;
                })
                .join('')}
                ${docs
                .map(({page, module}) => {
                    const path = page
                    .replace(`${docsPath}`, `${module}/docs`)
                    .replace('.js', '')
                    .replace('.md', '');
                    const route = path === '/index' ? '' : path;
                    return `
                            <url>
                                <loc>${`${url}${route}`}</loc>
                            </url>
                        `;
                })
                .join('')}
            </urlset>
        `;

    const formatted = prettier.format(sitemap, { parser: 'html' });

    // eslint-disable-next-line no-sync
    fs.writeFileSync('public/sitemap.xml', formatted);
})();
