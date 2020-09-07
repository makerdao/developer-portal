/** @jsx jsx */
import { jsx, Grid, Flex, NavLink, Text, Container } from 'theme-ui';
import Link from 'next/link';
import footerContent from '../data/footer.json';
import EmailSignup from './EmailSignup';

const Footer = () => {
  return (
    <Container as="footer">
      <Flex sx={{ justifyContent: 'space-between' }}>
        {footerContent.map(({ title, items }) => {
          return (
            <Flex as="nav" sx={{ flexDirection: 'column' }} key={title}>
              <Text sx={{ fontWeight: 'heading' }}>{title}</Text>
              {items.map(({ name }) => {
                return <Text key={name}>{name}</Text>;
              })}
            </Flex>
          );
        })}
        <Flex sx={{ flexDirection: 'column' }}>
          <Text sx={{ fontWeight: 'heading' }}>Signup for our newsletter</Text>
          <EmailSignup placeholder="Enter your email address" />
        </Flex>
      </Flex>
    </Container>
  );
};
// const Footer = () => {
//   console.log('footer', footerContent);
//   return (
//     <Container as="footer">
//       <Flex
//         as="nav"
//         sx={{
//           ml: [0, 'auto'],
//           mr: [null, 0],
//           justifyContent: 'flex-end',
//         }}
//       >
//         <NavLink
//           href="https://chat.makerdao.com/channel/help"
//           target="_blank"
//           variant="footer"
//           sx={{
//             px: [2, 3],
//           }}
//         >
//           Chat
//         </NavLink>
//         <NavLink
//           href="https://forum.makerdao.com/c/devs/19"
//           target="_blank"
//           variant="footer"
//           sx={{
//             px: [2, 3],
//           }}
//         >
//           Forums
//         </NavLink>
//       </Flex>
//     </Container>
//   );
// };

export default Footer;
