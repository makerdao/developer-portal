/** @jsx jsx */
import { useState } from 'react';
import {
  Container,
  jsx,
  Heading,
  Grid,
  Flex,
  NavLink,
  Card,
  Text,
  Link as ThemeLink,
} from 'theme-ui';
import { EcosystemCategories } from '../utils/constants';
import { Icon } from '@makerdao/dai-ui-icons';

const ListItem = ({ title, link, description }) => (
  <Card px={4}>
    <ThemeLink href={link} target="_blank">
      <Grid columns={'1fr auto'}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading sx={{ cursor: 'pointer' }} variant="microHeading">
            {title}
          </Heading>
          <Text sx={{ cursor: 'pointer' }} variant="smallText">
            {description}
          </Text>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Icon name="increase" color="text" />
        </Flex>
      </Grid>
    </ThemeLink>
  </Card>
);

const Ecosystem = ({ title, items, tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
          mb: 6,
        }}
      >
        <Flex
          sx={{
            pb: 4,
            alignItems: 'center',
          }}
        >
          <Heading pr={3}>{title}</Heading>
        </Flex>
        <Flex
          sx={{
            alignItems: 'center',
            pb: 2,
            overflow: 'auto',
          }}
        >
          {tabs.map((name) => (
            <NavLink
              key={name}
              onClick={() => setActiveTab(name)}
              sx={{
                color: activeTab === name ? 'primary' : undefined,
                minWidth: 'max-content',
                pl: 2,
                pr: 4,
                '&:first-of-type': { pl: 0 },
              }}
            >
              {EcosystemCategories[name]}
            </NavLink>
          ))}
        </Flex>

        <Grid columns={2} sx={{ width: '100%' }}>
          {items
            .filter((x) => x.categories.includes(activeTab))
            .map(({ title, link, description }) => {
              return <ListItem key={title} title={title} description={description} link={link} />;
            })}
        </Grid>
      </Flex>
    </Container>
  );
};

export default Ecosystem;
