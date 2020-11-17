import matter from 'gray-matter';
import { getContent, getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';

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
        const content = fs.readFileSync(`${file}`, 'utf8');
        const data = matter(content);

        return {
          fileName: file.substring(contentDir.length + 1, file.length - 3),
          fileRelativePath: file,
          data: {
            frontmatter: data.data,
            markdownBody: data.content,
          },
        };
      })
    );
    const filtered = resources.filter((file) => file.data.frontmatter.slug);
    return filtered;
  } catch (e) {
    const source = preview ? 'Github' : 'filesystem';
    throw new Error(`Error fetching files from ${source}: ${e}`);
  }
};

const getLocalFiles = async (filePath) => {
  // grab all md files
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
