// import { usePlugins } from 'tinacms';
// import { useRouter } from 'next/router';
// import slugify from 'slugify';
// import { FORM_ERROR } from 'final-form';

// import { toMarkdownString, flatDocs, getRandID } from '@utils';
// import { removeInvalidChars } from '../utils/removeInvalidChars';

const useCreateBlogPage = (allBlogs) => {
  console.log('^^^use create blog', allBlogs);
  // const router = useRouter();
  // const cms = useCMS();
  // usePlugins([
  // {
  //   __type: 'content-creator',
  //   name: 'Make a new blog post',
  //   fields: [
  //     {
  //       name: 'title',
  //       label: 'Title',
  //       component: 'text',
  //       required: true,
  //     },
  //     {
  //       name: 'description',
  //       label: 'Description',
  //       component: 'text',
  //       required: false,
  //     },
  //   ],
  // onSubmit: () => console.log('SUBMIT!'),
  // onSubmit: async (frontMatter) => {
  //   const github = cms.api.github;
  //   const slug = slugify(frontMatter.title);
  //   // const slug = removeInvalidChars(slugify(frontMatter.title, { lower: true }));
  //   const fileRelativePath = `content/resources/documentation/${slug}.md`;
  //   frontMatter.date = frontMatter.date || new Date().toString();
  //   return await github
  //     .commit(
  //       fileRelativePath,
  //       null,
  //       toMarkdownString({
  //         fileRelativePath,
  //         rawFrontmatter: {
  //           ...frontMatter,
  //         },
  //       }),
  //       'Update from TinaCMS'
  //     )
  //     .then((response) => {
  //       setTimeout(() => router.push(`/documentation/${slug}`), 1500);
  //     })
  //     .catch((e) => {
  //       return { [FORM_ERROR]: e };
  //     });
  // },
  // },
  // ]);
};

export default useCreateBlogPage;
