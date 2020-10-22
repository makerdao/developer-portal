import toc from 'markdown-toc-unlazy';

export default function generateTOC(markdown) {
  const tc =
    markdown.length > 0
      ? toc(markdown, {
          firsth1: false,
          slugify: (value) => require('slugify')(value, { lower: true }),
        }).json
      : [];
  return tc;
}
