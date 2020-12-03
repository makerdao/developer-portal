// import path from 'path';
// import { GITHUB_API_URL, REPO_NAME } from './constants';
import { GH_REPOS_ENDPOINT } from './constants';

const USE_CACHE = true;
// const USE_CACHE = process.env.USE_CACHE === 'true';
// const TAG_CACHE_PATH = path.resolve('.github-latest-jsonifiedCommit');

const metadataCallbacks = {
  author: (commits) => commits[commits.length - 1].commit.author,
  dateCreated: (commits) => commits[commits.length - 1].commit.author.date,
  lastModified: (commits) => commits[0].commit.author.date,
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

const getFileCommits = async (path) => {
  const fs = require('fs');
  let cachedCommits;

  if (USE_CACHE) {
    try {
      // await fs.writeFile(pagePath, editedContent, 'utf8')

      //   cachedCommits = await readFile(TAG_CACHE_PATH, 'utf8');
      const commitsRead = fs.readFileSync('testfile', 'utf8');
      cachedCommits = JSON.parse(commitsRead);

      //   console.log('***commitsRead JSON:', commitsRead);
      //   console.log('***commitsRead:', JSON.parse(commitsRead));j
      //   cachedCommits = JSON.parse(commitsRead);
    } catch (error) {
      console.log('^^^NO FILE READ', error);
      // A cached file is not required
    }
  }

  if (!cachedCommits[path]) {
    const myNewMetadata = {};
    console.log('%%%WE HAVE PATH:', cachedCommits[path]);
    // const commitsFetched = await fetch(`${GITHUB_API_URL}/repos/${REPO_NAME}/releases/latest`);
    const commitsFetched = await fetchCommits(path);
    const ftW = { [path]: {} };
    for (let cb in metadataCallbacks) {
      ftW[path][cb] = metadataCallbacks[cb](commitsFetched || []);
      // If the file frontmatter doesn't have the property, add it
      //   if (!file.data.frontmatter[cb]) {
      //     file.data.frontmatter[cb] = metadataCallbacks[cb](commit || []);
      //   }
    }
    // const commitsToWrite = { [path]: commitsFetched };
    const jsonifiedCommit = JSON.stringify({ ...cachedCommits, ...ftW });
    // const preExistingCommits = JSON.stringify(cachedCommits);

    // if (commitsFetched.ok) {
    //   const data = await commitsFetched.json();
    // const jsonifiedCommit = commitsFetched;

    if (USE_CACHE) {
      try {
        //   await writeFile(TAG_CACHE_PATH, jsonifiedCommit, 'utf8');
        await fs.writeFileSync('testfile', jsonifiedCommit, function (err) {
          if (err) return console.log(err);
          //   console.log('Hello World > helloworld.txt');
        });
      } catch (error) {
        // A cached file is not required
        console.log('^^^NO FILE WRITE', error);
      }
    }

    // cachedCommits = jsonifiedCommit;
    // }
    return commitsFetched;
  }
};

export default getFileCommits;
