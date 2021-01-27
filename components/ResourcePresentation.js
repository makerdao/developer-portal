/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx, Grid } from 'theme-ui';
import { useCMS } from 'tinacms';
import useStore from '@stores/store';
import RelatedResources from '@components/RelatedResources';
import ResourceEditor from '@components/ResourceEditor';
import Contributors from '@components/Contributors';
import Feedback from '@components/Feedback';
import ContributeCta from '@components/ContributeCta';
import BreadCrumbs from '@components/BreadCrumbs';
import { navItems } from '../data/resourcesSubNav.json';

const ResourcePresentation = ({ file, resources, relatedResources, contentType, preview }) => {
  const cms = useCMS();
  const { asPath } = useRouter();
  const contributors = file.data.frontmatter.contributors;
  const [activeGroup, activeParent] = useStore((state) => [state.activeGroup, state.activeParent]);
  const group = navItems.find(({ slug }) => activeGroup === slug);
  const parent = resources?.find((r) => r.data.frontmatter.slug === activeParent)?.data.frontmatter;

  return (
    <>
      <BreadCrumbs
        contentType={contentType}
        group={group}
        parent={parent}
        title={file.data.frontmatter.title}
      />
      <ResourceEditor file={file} preview={preview} cms={cms} />
      <Grid gap={4}>
        {relatedResources && (
          <RelatedResources resources={relatedResources} contentType={contentType} />
        )}
        <Feedback route={asPath} cms={cms} />
        <ContributeCta file={file} />
        {contributors && <Contributors contributors={contributors} />}
      </Grid>
    </>
  );
};

export default ResourcePresentation;
