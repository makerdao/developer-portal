/** @jsx jsx */
import { jsx, Input, Flex, IconButton, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import useEmailSubscribe from '../hooks/useEmailSubscribe';

const EmailSignup = ({ placeholder, ...props }) => {
  const { inputEl, subscribe, loading, success, errorMessage } = useEmailSubscribe();
  return success ? (
    <Flex sx={{ alignItems: 'center' }}>
      <Text color="primary">Thank you for signing up.</Text>
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          bg: 'primary',
          size: '25px',
          borderRadius: 'round',
          mx: 2,
        }}
      >
        <Icon name="checkmark" size="3" />
      </Flex>
    </Flex>
  ) : (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex>
        <Input
          {...props}
          aria-label="Email for newsletter"
          ref={inputEl}
          type="email"
          placeholder={placeholder}
          disabled={loading}
          sx={{
            fontFamily: 'body',
            fontSize: 5,
            width: '350px',
            borderColor: (theme) => `transparent transparent ${theme.colors.muted} transparent`,
            '&:focus': {
              borderColor: (theme) => `transparent transparent ${theme.colors.muted} transparent`,
              color: 'textMuted',
            },
            '::placeholder': {
              color: 'textMuted',
              opacity: 1,
            },
          }}
        ></Input>
        <IconButton disabled={loading} onClick={subscribe} sx={{ m: 'auto' }}>
          <Icon name="arrow_right" color="primary" />
        </IconButton>
      </Flex>
      {errorMessage && (
        <Text variant="plainText" sx={{ fontSize: 2, color: 'primary' }}>
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
};

export default EmailSignup;
