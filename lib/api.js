import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
// cannnot use babel-plugin-impoprt-glob-array and webpack alias together
import { default as pages, _importMeta as metadata } from '../content/**/*.mdx';

export const fetchAllContent = () => {
  const content = pages.reduce((acc, val, i) => {
    const { content, data } = matter(val);
    acc.push({ content, metadata: metadata[i], frontMatter: data });
    return acc;
  }, []);

  return content;
};

export function getFileNames(targetPath) {
  const postsDirectory = join(process.cwd(), targetPath);
  const filenames = fs.readdirSync(postsDirectory);

  return filenames;
}

export function fetchPostSlugs(targetPath) {
  return fs.promises.readdir(join(process.cwd(), targetPath));
}
