import matter from 'gray-matter';
import { getContent, getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import { GH_REPOS_ENDPOINT } from './constants';

let _commitsCache = {};

const metadataCallbacks = {
  author: (commits) => commits[commits.length - 1].commit.author.name,
  dateCreated: (commits) => commits[commits.length - 1].commit.author.date,
  lastModified: (commits) => commits[0].commit.author.date,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getResources = async (preview, previewData, contentDir) => {
  const fs = require('fs');
  const files = preview
    ? await getGithubFiles(contentDir, previewData)
    : await getLocalFiles(contentDir);

  try {
    const resources = await Promise.all(
      files.map(async (file) => {
        if (preview) {
          const previewProps = await getGithubPreviewProps({
            ...previewData,
            fileRelativePath: file,
            parse: parseMarkdown,
          });
          return {
            fileName: file.substring(contentDir.length + 1, file.length - 3),
            fileRelativePath: file,
            data: previewProps.props.file?.data,
          };
        }

        const fileContent = fs.readFileSync(`${file}`, 'utf8');
        const { data, content } = matter(fileContent);

        return {
          fileName: file.substring(contentDir.length + 1, file.length - 3),
          fileRelativePath: file,
          data: {
            frontmatter: data,
            markdownBody: content,
          },
        };
      })
    );

    const filtered = resources.filter((file) => file.data.frontmatter.slug);

    for (let file of filtered) {
      // Check if the file is missing the additional frontmatter properties we need
      if (
        !Object.keys(file.data.frontmatter).every((property) =>
          Object.keys(metadataCallbacks).includes(property)
        )
      ) {
        // If not, fetch the commits and cache them
        if (!_commitsCache[file.fileRelativePath]) {
          _commitsCache[file.fileRelativePath] = await getFileCommits(file.fileRelativePath);

          // Must sleep to avoid Github API abuse detection mechanism when building
          if (process.env.GH_THROTTLE) await sleep(500);
        }

        for (let cb in metadataCallbacks) {
          // If the file frontmatter doesn't have the property, add it
          if (!file.data.frontmatter[cb]) {
            file.data.frontmatter[cb] = metadataCallbacks[cb](_commitsCache[file.fileRelativePath]);
          }
        }
      }
    }

    return filtered;
  } catch (e) {
    const source = preview ? 'Github' : 'filesystem';
    throw new Error(`Error fetching files from ${source}: ${e}`);
  }
};

const getLocalFiles = async (filePath) => {
  const fg = require('fast-glob');
  const files = await fg(`${filePath}/**/*.md`);
  return files;
};

const getGithubFiles = async (contentDir, previewData) => {
  const files = [];

  const getNestedGithubFiles = async (dir) => {
    const { data } = await getContent(
      previewData.working_repo_full_name,
      previewData.head_branch,
      dir,
      previewData.github_access_token
    );

    for (let item of data) {
      if (item.type === 'file') files.push(item.path);
      else if (item.type === 'dir') await getNestedGithubFiles(item.path);
    }
  };

  await getNestedGithubFiles(contentDir);
  return files;
};

const getFileCommits = async (path) => {
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

export default getResources;
