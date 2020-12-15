/** @jsx jsx */
import { jsx, Label, Checkbox, Link as ThemeLink, Text } from 'theme-ui';

const TosCheck = ({ onChange, ...props }) => {
  return (
    <Label sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox onChange={onChange} />
      <Text variant="plainText" sx={{ ...props.sx, fontSize: 4 }} {...props}>
        I agree to the <ThemeLink>Terms of Service</ThemeLink> and the{' '}
        <ThemeLink>Privacy Policy</ThemeLink>
      </Text>
    </Label>
  );
};

export default TosCheck;
