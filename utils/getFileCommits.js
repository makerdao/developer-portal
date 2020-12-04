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
  const { USERNAME_ISSUES, GH_TOKEN_ISSUES, REPO_ISSUES } = process.env;
  const token = Buffer.from(`${USERNAME_ISSUES}:${GH_TOKEN_ISSUES}`, 'utf8').toString('base64');
  const url = `${GH_REPOS_ENDPOINT}/${REPO_ISSUES}/commits?path=${path}`;
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
        await sleep(350);
      } catch (error) {
        // A cached file is not required
      }
    }

    return cacheEntry[path];
  } else {
    return cachedCommits[path];
  }
};

export default getFileCommits;
