/** @jsx jsx */
import { useEffect } from 'react';
import { InlineForm } from 'react-tinacms-inline';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { usePlugin, useCMS, useFormScreenPlugin } from 'tinacms';
import { jsx, Text, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import MarkdownWrapper from '@components/markdown-wrapper';
import EditLink from '@components/EditLink';
import SubNav from '@components/SubNav';
import useSubNavForm from '../hooks/useSubNavForm';
import GuidesLayout from '@layouts/GuidesLayout';
import useStore from '../stores/store';

const EDIT_LINK = 'https://github.com/makerdao/developer-portal/edit/master/';

const ResourceEditor = ({ file, navFile, contentType, preview, resources, slug, toc }) => {
  const cms = useCMS();
  const setActiveModule = useStore((state) => state.setActiveModule);

  useEffect(() => {
    setActiveModule(file.data.frontmatter.parent);
  }, [setActiveModule, file.data.frontmatter.parent]);

  const [navData, navForm] = useSubNavForm(navFile, preview);
  useFormScreenPlugin(navForm);

  const [data, form] = useGithubMarkdownForm(file);
  usePlugin(form);

  const moduleResources = resources
    ?.filter(
      (r) =>
        r.data.frontmatter.parent === file.data.frontmatter.parent &&
        r.data.frontmatter.contentType === contentType
    )
    .reduce((acc, val) => {
      acc.push({
        title: val.data.frontmatter.title,
        slug: val.data.frontmatter.slug,
        root: val.data.frontmatter.root,
      });
      return acc;
    }, [])
    .sort((a, b) => (a.root ? -1 : b.root ? 1 : 0));

  return (
    <GuidesLayout
      resources={moduleResources}
      slug={slug}
      toc={toc}
      resourcePath={contentType}
      subnav={<SubNav links={navData.navItems} />}
    >
      <InlineForm form={form}>
        <InlineWysiwyg
          name="markdownBody"
          sticky={'calc(var(--tina-toolbar-height) + var(--tina-padding-small))'}
          imageProps={{
            directory: 'public/images/',
            parse: (filename) => '/images/' + filename,
            previewSrc(src) {
              return cms.api.github.getDownloadUrl('public/' + src);
            },
          }}
          focusRing={{ offset: { x: 35, y: 0 }, borderRadius: 0 }}
        >
          <MarkdownWrapper source={data.markdownBody} />
        </InlineWysiwyg>
      </InlineForm>
      <Flex sx={{ my: 4, flexDirection: 'column', alignItems: 'flex-start' }}>
        <EditLink />
        <ThemeLink href={`${EDIT_LINK}${file.fileRelativePath}`} target="_blank">
          <Flex sx={{ alignItems: 'center', mt: 2 }}>
            <Text sx={{ color: 'text', cursor: 'pointer' }}>Edit on Github</Text>
            <Icon sx={{ ml: 2 }} color="primary" name={'arrow_right'}></Icon>
          </Flex>
        </ThemeLink>
      </Flex>
    </GuidesLayout>
  );
};

export default ResourceEditor;
