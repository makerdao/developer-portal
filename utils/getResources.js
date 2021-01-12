import matter from 'gray-matter';
import { getContent, getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import getFileCommits, { metadataCallbacks } from './getFileCommits';

const getResources = async (preview, previewData, contentDir) => {
  const useCache = process.env.USE_CACHE === 'true' || preview;

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

    if (!preview) {
      for (let file of filtered) {
        // Check if the file is missing the additional frontmatter properties we need
        if (
          !Object.keys(file.data.frontmatter).every((property) =>
            Object.keys(metadataCallbacks).includes(property)
          )
        ) {
          // If so, fetch the properties from the commits and add to the frontmatter
          const commitData = await getFileCommits(file, useCache);
          file.data.frontmatter = { ...file.data.frontmatter, ...commitData };
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

export default getResources;
