/** @jsx jsx */
import { useEffect } from 'react';
import { InlineForm } from 'react-tinacms-inline';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { usePlugin, useCMS, useFormScreenPlugin } from 'tinacms';
import { jsx, Grid } from 'theme-ui';
import MarkdownWrapper from '@components/MarkdownWrapper';
import SubNav from '@components/SubNav';
import RelatedResources from '@components/RelatedResources';
import Contributors from '@components/Contributors';
import Feedback from '@components/Feedback';
import ContributeCta from '@components/ContributeCta';
import useSubNavForm from '../hooks/useSubNavForm';
import useEditFrontmatterForm from '../hooks/useEditFrontmatterForm';
import ResourcesLayout from '@layouts/ResourcesLayout';
import useStore from '../stores/store';
import { useRouter } from 'next/router';

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
  const { asPath } = useRouter();
  const setActiveGroup = useStore((state) => state.setActiveGroup);

  useEffect(() => {
    setActiveGroup(file.data.frontmatter.group);
  }, [setActiveGroup, file.data.frontmatter.group]);

  const [navData, navForm] = useSubNavForm(navFile, preview);
  useFormScreenPlugin(navForm);

  const [fmData, fmForm] = useEditFrontmatterForm(file, preview);
  useFormScreenPlugin(fmForm);

  const [data, form] = useGithubMarkdownForm(file);
  usePlugin(form);

  return (
    <ResourcesLayout
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
      <Grid gap={4}>
        <Feedback route={asPath} cms={cms} />
        <ContributeCta file={file} />
        <Contributors contributors={file.data.frontmatter.contributors} />
      </Grid>
    </ResourcesLayout>
  );
};

export default ResourceEditor;
