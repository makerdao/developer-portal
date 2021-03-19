/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx, Grid } from 'theme-ui';
import { useCMS, usePlugin } from 'tinacms';
import { InlineForm } from 'react-tinacms-inline';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import useStore from '@stores/store';
import RelatedResources from '@components/RelatedResources';
import ResourceEditor from '@components/ResourceEditor';
import Contributors from '@components/Contributors';
import Feedback from '@components/Feedback';
import ContributeCta from '@components/ContributeCta';
import BreadCrumbs from '@components/BreadCrumbs';
import { navItems } from '../data/resourcesSubNav.json';

const ResourcePresentation = ({
  file,
  sharedContentfile,
  resources,
  relatedResources,
  contentType,
  preview,
  mobile,
}) => {
  const cms = useCMS();
  const { asPath } = useRouter();

  const [data, form] = useGithubJsonForm(sharedContentfile);
  usePlugin(form);
  useGithubToolbarPlugins();

  const contributors = file.data.frontmatter.contributors;
  const [activeGroup, activeParent] = useStore((state) => [state.activeGroup, state.activeParent]);
  const group = navItems.find(({ slug }) => activeGroup === slug);
  const parent = resources?.find((r) => r.data.frontmatter.slug === activeParent)?.data.frontmatter;

  return (
    <InlineForm form={form}>
      <BreadCrumbs
        contentType={contentType}
        group={group}
        parent={parent}
        title={file.data.frontmatter.title}
      />
      <ResourceEditor file={file} preview={preview} cms={cms} />
      <Grid gap={4}>
        {relatedResources && relatedResources.length > 0 && (
          <RelatedResources resources={relatedResources} contentType={contentType} />
        )}
        <Feedback route={asPath} cms={cms} mobile={mobile} />
        <ContributeCta file={file} mobile={mobile} />
        {contributors && <Contributors contributors={contributors} mobile={mobile} />}
      </Grid>
    </InlineForm>
  );
};

export default ResourcePresentation;
