import fs from 'fs';
import { join } from 'path';

export function getFileNames(targetPath) {
  const postsDirectory = join(process.cwd(), targetPath);
  const filenames = fs.readdirSync(postsDirectory);

  return filenames;
}

export function fetchPostSlugs(targetPath) {
  return fs.promises.readdir(join(process.cwd(), targetPath));
}
