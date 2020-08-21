const path = require('path');
// const slug = require('remark-slug');
// const mdxTableOfContents = require('./lib/toc-module');

// "leeroy" implementation https://github.com/leerob/leerob.io
const withMdxEnhanced = require('next-mdx-enhanced');
module.exports = withMdxEnhanced({
  defaultLayout: false,
  fileExtensions: ['mdx'],
  remarkPlugins: [],
  rehypePlugins: [],
  extendFrontMatter: {
    process: mdxContent =>
      console.log('PROCESS', mdxContent) || {
        readingTime: 'test text',
      },
    phase: 'prebuild|loader|both',
  },
})();

// "uu64" implementation https://github.com/uu64/nextjs-mdx-blog-sample/blob/master/next.config.js
// module.exports = {
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.(md|mdx)$/,
//       // test: /\.md?$/,
//       use: [
//         options.defaultLoaders.babel,
//         '@mdx-js/loader',
//         path.join(__dirname, './lib/fm-loader'),
//       ],
//     });

//     config.node = {
//       fs: 'empty',
//     };

//     return config;
//   },
// };
