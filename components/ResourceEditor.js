/** @jsx jsx */
import { useEffect } from 'react';
import { InlineForm } from 'react-tinacms-inline';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { usePlugin, useCMS, useFormScreenPlugin } from 'tinacms';
import { jsx, Text, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import MarkdownWrapper from '@components/MarkdownWrapper';
import EditLink from '@components/EditLink';
import SubNav from '@components/SubNav';
import useSubNavForm from '../hooks/useSubNavForm';
import GuidesLayout from '@layouts/GuidesLayout';
import useStore from '../stores/store';
import { GITHUB_EDIT_LINK } from '../utils/constants';

const ResourceEditor = ({ file, navFile, contentType, preview, resources, slug, toc }) => {
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
      <Flex sx={{ my: 4, flexDirection: 'column', alignItems: 'flex-start' }}>
        <EditLink enterText="Edit This Page With TinaCMS" />
        <ThemeLink href={`${GITHUB_EDIT_LINK}${file.fileRelativePath}`} target="_blank">
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
