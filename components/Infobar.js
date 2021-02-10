/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react';
import { jsx, Box, NavLink, Text, Flex } from 'theme-ui';
import Link from 'next/link';

const ContentsMenuItem = ({
  resourcePath,
  slug,
  title,
  anchor,
  root,
  activeAnchor,
  setActiveAnchor,
}) => {
  const active = activeAnchor === anchor;
  return (
    <Flex
      as="li"
      sx={{
        variant: 'styles.fakeLi',
        my: 1,
        position: 'relative',
        right: '1px',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          pl: !root ? 3 : undefined,
          border: active ? 'light' : undefined,
          borderColor: 'primary',
          borderWidth: '0 0 0 1px',
        }}
      >
        <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}#${anchor}`} passHref>
          <NavLink
            variant="infobar"
            onClick={() => setActiveAnchor(anchor)}
            sx={{
              textAlign: 'left',
              color: active ? 'text' : undefined,
              borderRadius: 'xs',
              py: 0,
              px: [2, 2, 2, 4],
              lineHeight: '21px',
              width: '100%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </NavLink>
        </Link>
      </Flex>
    </Flex>
  );
};

const FileContents = ({ resourcePath, slug, toc }) => {
  const [activeAnchor, setActiveAnchor] = useState(toc[0].slug);
  useEffect(() => {
    setActiveAnchor(toc[0].slug);
  }, [toc]);
  const h1s = toc.filter((x) => x.lvl === 1);
  return toc.map(({ content: title, slug: anchor, lvl }, i) => {
    // Don't need nesting more than 3 levels deep for the TOC
    if (lvl > 3) return null;

    const root = h1s.length === 1 ? lvl === 1 || lvl === 2 : lvl === 1;
    return (
      <Fragment key={`${anchor}${i}`}>
        {root ? (
          <ContentsMenuItem
            resourcePath={resourcePath}
            slug={slug}
            key={anchor}
            title={title}
            anchor={anchor}
            activeAnchor={activeAnchor}
            setActiveAnchor={setActiveAnchor}
            root
          />
        ) : (
          <ul
            sx={{
              m: 0,
              p: 0,
            }}
          >
            <ContentsMenuItem
              resourcePath={resourcePath}
              slug={slug}
              key={anchor}
              title={title}
              anchor={anchor}
              activeAnchor={activeAnchor}
              setActiveAnchor={setActiveAnchor}
              root={root}
            />
          </ul>
        )}
      </Fragment>
    );
  });
};

const Infobar = ({ resourcePath, slug, toc }) => {
  return (
    <Box
      sx={{
        border: 'solid',
        borderColor: 'muted',
        borderWidth: '0 0 0 1px',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderColor: 'muted',
          borderWidth: '0 0 1px 0',
          width: '100%',
          p: 3,
        }}
      >
        <Text sx={{ fontFamily: 'FT Base', pl: 3 }} variant="microText">
          Contents
        </Text>
      </Box>
      <Box sx={{ pl: 0, pr: 3, pt: 3 }}>
        <Text sx={{ pl: [2, 2, 2, 4], pt: 0, pb: 2, color: 'textMuted' }} variant="caps">
          On This Page
        </Text>
        <FileContents resourcePath={resourcePath} slug={slug} toc={toc} />
      </Box>
    </Box>
  );
};

export default Infobar;
