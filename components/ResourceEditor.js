/** @jsx jsx */
import { useEffect } from 'react';
import { InlineForm } from 'react-tinacms-inline';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { usePlugin, useCMS, useFormScreenPlugin } from 'tinacms';
import { jsx, Text, Flex, Link as ThemeLink, Grid } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import MarkdownWrapper from '@components/MarkdownWrapper';
import EditLink from '@components/EditLink';
import SubNav from '@components/SubNav';
import RelatedResources from '@components/RelatedResources';
import Contributors from '@components/Contributors';
import Feedback from '@components/Feedback';
import useSubNavForm from '../hooks/useSubNavForm';
import GuidesLayout from '@layouts/GuidesLayout';
import useStore from '../stores/store';
import { GITHUB_EDIT_LINK } from '../utils/constants';

const contributors = [
  {
    date: 'Nov, 24 2020',
    name: '@philip',
    avatar: 'https://avatars2.githubusercontent.com/u/13105602?v=4',
  },
  {
    date: 'Nov, 14 2020',
    name: '@petrucatana',
    avatar: 'https://avatars2.githubusercontent.com/u/13105602?v=4',
  },
  {
    date: 'Nov, 07 2020',
    name: '@tiago',
    avatar: 'https://avatars2.githubusercontent.com/u/13105602?v=4',
  },
];

const ResourceEditor = ({
  file,
  navFile,
  contentType,
  preview,
  resources,
  relatedResources,
  slug,
  toc,
}) => {
  const cms = useCMS();
  const setActiveModule = useStore((state) => state.setActiveModule);

  useEffect(() => {
    setActiveModule(file.data.frontmatter.group);
  }, [setActiveModule, file.data.frontmatter.group]);

  const [navData, navForm] = useSubNavForm(navFile, preview);
  useFormScreenPlugin(navForm);

  const [data, form] = useGithubMarkdownForm(file);
  usePlugin(form);

  return (
    <GuidesLayout
      resources={resources}
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
              return cms.media.previewSrc(src);
            },
          }}
          focusRing={{ offset: { x: 35, y: 0 }, borderRadius: 0 }}
        >
          <MarkdownWrapper source={data.markdownBody} />
        </InlineWysiwyg>
      </InlineForm>
      <RelatedResources resources={relatedResources} contentType={contentType} />
      <Flex sx={{ my: 4, flexDirection: 'column', alignItems: 'flex-start' }}>
        <EditLink enterText="Edit This Page With TinaCMS" />
        <ThemeLink href={`${GITHUB_EDIT_LINK}${file.fileRelativePath}`} target="_blank">
          <Flex sx={{ alignItems: 'center', mt: 2 }}>
            <Text sx={{ color: 'text', cursor: 'pointer' }}>Edit on Github</Text>
            <Icon sx={{ ml: 2 }} color="primary" name={'arrow_right'}></Icon>
          </Flex>
        </ThemeLink>
      </Flex>
      <Grid gap={4}>
        <Feedback />
        <Contributors contributors={contributors} />
      </Grid>
    </GuidesLayout>
  );
};

export default ResourceEditor;
