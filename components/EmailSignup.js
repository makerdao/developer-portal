/** @jsx jsx */
import { jsx, Input, Box } from 'theme-ui';

const EmailSignup = ({ placeholder }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Input placeholder={placeholder}></Input>
    </Box>
  );
};

export default EmailSignup;
