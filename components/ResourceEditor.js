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

  const walk = (resources, array) => {
    array.forEach((item) => {
      const children = resources.filter(
        (resource) => resource.data.frontmatter.parent === item.data.frontmatter.slug
      );
      if (children.length > 0) {
        item.children = children;
        walk(resources, item.children);
      }
    });
  };

  const moduleResources = resources
    ?.filter(
      (r) =>
        r.data.frontmatter.group === file.data.frontmatter.group &&
        r.data.frontmatter.contentType === contentType
    )
    .reduce((acc, val, i, array) => {
      const isTopLevel = val.data.frontmatter.root && !val.data.frontmatter.parent;

      if (isTopLevel) {
        const dataObj = [val];
        walk(array, dataObj);
        acc.push(dataObj);
      }
      return acc;
    }, [])
    .sort();

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
