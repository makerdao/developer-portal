/** @jsx jsx */
import { jsx, Input, Flex, IconButton } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import useEmailSubscribe from '../hooks/useEmailSubscribe';

const EmailSignup = ({ placeholder }) => {
  const { inputEl, subscribe } = useEmailSubscribe();
  return (
    <Flex sx={{ width: '100%' }}>
      <Input
        aria-label="Email for newsletter"
        ref={inputEl}
        type="email"
        placeholder={placeholder}
      ></Input>
      <IconButton onClick={subscribe} sx={{ m: 'auto' }}>
        <Icon name="arrow_right" color="primary" />
      </IconButton>
    </Flex>
  );
};

export default EmailSignup;
