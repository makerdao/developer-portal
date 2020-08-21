import fs from 'fs';
import { join } from 'path';
// cannnot use babel-plugin-impoprt-glob-array and webpack alias together
import {
  default as pages,
  _importMeta as metadata,
  frontMatter,
} from '../content/**/*.mdx';

export function getFileNames(targetPath) {
  const postsDirectory = join(process.cwd(), targetPath);
  const filenames = fs.readdirSync(postsDirectory);

  return filenames;
}

// export function fetchPostSlugs(targetPath) {
//   return fs.promises.readdir(join(process.cwd(), targetPath));
// }

export const getPosts = () => {
  console.log('metadata:', metadata);
  console.log('frontMatter:', frontMatter);
};
