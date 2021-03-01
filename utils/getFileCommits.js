import matter from 'gray-matter';
import { toMarkdownString } from '@utils';
import { GH_REPOS_ENDPOINT } from './constants';

const USE_CACHE = process.env.USE_CACHE === 'true';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const metadataCallbacks = {
  author: (commits) => commits[commits.length - 1].commit.author.name,
  dateCreated: (commits) => commits[commits.length - 1].commit.author.date,
  lastModified: (commits) => commits[0].commit.author.date,
  contributors: (commits) => {
    // Get the unique contributors and date of their last commit
    const contributors = [
      ...new Map(
        commits.reverse().map((c) => [
          c.commit.author.name,
          {
            author: c.commit.author.name,
            date: c.commit.author.date,
            avatar: c.author.avatar_url,
            username: c.author.login,
          },
        ])
      ).values(),
    ];
    return contributors;
  },
};

const fetchCommits = async (path) => {
  const { USERNAME_ISSUES, GH_TOKEN_ISSUES, REPO_ISSUES, BASE_BRANCH } = process.env;
  const token = Buffer.from(`${USERNAME_ISSUES}:${GH_TOKEN_ISSUES}`, 'utf8').toString('base64');
  const url = `${GH_REPOS_ENDPOINT}/${REPO_ISSUES}/commits?sha=${BASE_BRANCH}&path=${path}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    accept: 'application/vnd.github.v3+json',
    method: 'GET',
  });

  const json = await response.json();
  if (!response.ok)
    throw new Error(`${response.statusText}: ${json.error?.message || JSON.stringify(json)}`);

  return json;
};

const getFileCommits = async (file) => {
  const fs = require('fs');
  let cachedCommits = {};
  const frontmatterKeys = Object.keys(file.data.frontmatter);
  const path = file.fileRelativePath;

  if (USE_CACHE) {
    try {
      const commitsRead = fs.readFileSync('cachefile', 'utf8');
      cachedCommits = JSON.parse(commitsRead || {});
    } catch (error) {
      // A cached file is not required
    }
  }

  if (!cachedCommits[path]) {
    const commitsFetched = await fetchCommits(path);

    const cacheEntry = { [path]: {} };

    for (let cb in metadataCallbacks) {
      if (!frontmatterKeys.includes(cb))
        cacheEntry[path][cb] = metadataCallbacks[cb](commitsFetched || []);
    }

    if (USE_CACHE) {
      const jsonifiedCommit = JSON.stringify({ ...cachedCommits, ...cacheEntry });
      try {
        await fs.writeFileSync('cachefile', jsonifiedCommit, function (err) {
          if (err) return console.log(err);
        });
        // Must sleep to avoid Github API abuse detection mechanism when building
        await sleep(500);
      } catch (error) {
        // A cached file is not required
      }
    }

    return cacheEntry[path];
  } else {
    return cachedCommits[path];
  }
};

/**
 * This takes a file, searches it for old links to docs.makerdao.com and
 * replaces those links with the correct new path using the slug.
 * It will need to be run several times, once for each reference to the gitbook url within
 * each file.
 */
export const updateGitbookUrl = async (file) => {
  const fs = require('fs');
  const fg = require('fast-glob');
  const str = file.data.markdownBody;

  const reg = /\(https:\/\/docs.makerdao(.*?)\)/;

  // find the URL we need to change
  const [matchedUrlUntrim] = str.match(reg);

  // trim off the parens
  const matchedUrl = matchedUrlUntrim.substring(1, matchedUrlUntrim.length - 1);

  // get the filename of the new file we need to find
  const [fileNameA] = matchedUrl.split('/').slice(-1);

  // split possible anchor links
  const [fileNameB] = fileNameA.split('#');

  if (!fileNameB || fileNameB === '') return null;

  // fastglob the new file to get the full path
  let newFile = null;
  try {
    newFile = await fg(`content/resources/documentation/**/${fileNameB}.md`);
  } catch (e) {
    console.error(`Error trying to fetch file named: ${fileNameB}`, e);
  }

  if (!newFile || newFile === '' || newFile.length < 1) {
    console.log('not found for filename:', fileNameA, 'original file:', file.fileRelativePath);
    return null;
  }

  // read the new file & run it through gray matter to get some metadata
  let fileContent;
  try {
    fileContent = fs.readFileSync(`${newFile}`, 'utf8');
  } catch (e) {
    console.error(`^^^Error trying to readFileSync newFile: "${newFile}"`, e);
  }
  const { data, content } = matter(fileContent);

  // content type and slug will become the new path for our URL
  const contentType = data.contentType;
  const slug = data.slug;

  // replace the old URL with the new URL
  const newStr = file.data.markdownBody.replace(reg, `(/${contentType}/${slug})`);

  // we delete these props because they're added dynamically and we don't need to store them at this time
  delete file.data.frontmatter.author;
  delete file.data.frontmatter.dateCreated;
  delete file.data.frontmatter.lastModified;
  delete file.data.frontmatter.contributors;

  // create a markdown string to replace our initial file content with content that has the updated URLs
  const mdStr = toMarkdownString({
    rawFrontmatter: file.data.frontmatter,
    rawMarkdownBody: newStr,
  });

  // Finally write the file
  try {
    await fs.writeFileSync(file.fileRelativePath, mdStr, function (err) {
      if (err) return console.log(err);
    });
    await sleep(200);
  } catch (error) {}
};

export default getFileCommits;
