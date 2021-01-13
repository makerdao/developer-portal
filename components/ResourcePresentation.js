/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx, Grid } from 'theme-ui';
import { useCMS } from 'tinacms';
import RelatedResources from '@components/RelatedResources';
import ResourceEditor from '@components/ResourceEditor';
import Contributors from '@components/Contributors';
import Feedback from '@components/Feedback';
import ContributeCta from '@components/ContributeCta';

const ResourcePresentation = ({ file, relatedResources, contentType, preview }) => {
  const cms = useCMS();
  const { asPath } = useRouter();
  const contributors = file.data.frontmatter.contributors;

  return (
    <>
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
