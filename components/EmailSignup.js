/** @jsx jsx */
import { jsx, Input, Flex, IconButton } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import useEmailSubscribe from '../hooks/useEmailSubscribe';

const EmailSignup = ({ placeholder }) => {
  const { inputEl, subscribe, loading } = useEmailSubscribe();
  return (
    <Flex>
      <Input
        aria-label="Email for newsletter"
        ref={inputEl}
        type="email"
        placeholder={placeholder}
      ></Input>
      <IconButton disabled={loading} onClick={subscribe} sx={{ m: 'auto' }}>
        <Icon name="arrow_right" color="primary" />
      </IconButton>
    </Flex>
  );
};

export default EmailSignup;
