/** @jsx jsx */
import { useState } from 'react';
import {
  Container,
  jsx,
  Card,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  Image,
} from 'theme-ui';
import Link from 'next/link';
import SingleLayout from '../layouts/SingleLayout.js';

const content = [
  [
    'Guides',
    'text goes here',
    () => {
      const guides = [
        [
          'How to la la',
          'Maker is unlocking the power of decentralized finance for everyone by creating an inclusive platform for economic empowerment',
        ],
        [
          'How to la la',
          'Maker is unlocking the power of decentralized finance for everyone by creating an inclusive platform for economic empowerment',
        ],
        [
          'How to la la',
          'Maker is unlocking the power of decentralized finance for everyone by creating an inclusive platform for economic empowerment',
        ],
        [
          'How to la la',
          'Maker is unlocking the power of decentralized finance for everyone by creating an inclusive platform for economic empowerment',
        ],
      ];

      return (
        <Flex>
          {guides.map(([title, text]) => {
            return (
              <Card
                sx={{
                  mr: 3,
                }}
              >
                <Heading>{title}</Heading>
                <Text>{text}</Text>
              </Card>
            );
          })}
        </Flex>
      );
    },
  ],
  [
    'Documentation',
    '',
    () => {
      const guides = [
        'dai.js gov plugin docs',
        'data api gov queries',
        'gov documentation',
      ];

      return (
        <Box>
          {guides.map(title => {
            return (
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Text>{title} -> </Text>
              </Box>
            );
          })}
        </Box>
      );
    },
  ],
  [
    'Ecosystem',
    'text goes here',
    () => {
      const guides = ['mkr.gov', 'vote.makerdao.com'];

      return (
        <Flex>
          {guides.map(title => {
            return (
              <Card>
                <Heading>{title}</Heading>
                <Text>{title} </Text>
              </Card>
            );
          })}
        </Flex>
      );
    },
  ],
];

const Governance = () => {
  return (
    <SingleLayout>
      <Container>
        <Flex
          sx={{
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Heading variant="mediumHeading">Governance</Heading>
            <Text>Participate, vote.</Text>
          </Box>
        </Flex>

        {content.map(([title, text, Content]) => {
          console.log(Content, 'laala');
          return (
            <Flex
              sx={{
                mb: 6,
              }}
            >
              <Box>
                <Heading>{title}</Heading>
                <Text>{text}</Text>
                <Content />
              </Box>
            </Flex>
          );
        })}
      </Container>
    </SingleLayout>
  );
};

export default Governance;
