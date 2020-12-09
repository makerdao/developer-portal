/** @jsx jsx */
import { jsx, Input, Flex, IconButton } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import useEmailSubscribe from '../hooks/useEmailSubscribe';

const EmailSignup = ({ placeholder, ...props }) => {
  const { inputEl, subscribe, loading } = useEmailSubscribe();
  return (
    <Flex>
      <Input
        {...props}
        aria-label="Email for newsletter"
        ref={inputEl}
        type="email"
        placeholder={placeholder}
        sx={{
          fontFamily: 'body',
          fontSize: 5,
          borderColor: (theme) => `transparent transparent ${theme.colors.muted} transparent`,
          color: 'textMuted',
        }}
      ></Input>
      <IconButton disabled={loading} onClick={subscribe} sx={{ m: 'auto' }}>
        <Icon name="arrow_right" color="primary" />
      </IconButton>
    </Flex>
  );
};

export default EmailSignup;
