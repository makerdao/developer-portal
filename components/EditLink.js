/** @jsx jsx */
import { jsx, Flex, Button } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { useCMS } from 'tinacms';

const EditLink = ({ enterText = 'Edit This Site With TinaCMS', exitText = 'Exit Edit Mode' }) => {
  const cms = useCMS();
  return (
    <Button sx={{ my: 4 }} onClick={() => cms.toggle()}>
      <Flex sx={{ alignItems: 'center' }}>
        <Icon name={'edit'} sx={{ mr: 1 }}></Icon>
        {cms.enabled ? exitText : enterText}
      </Flex>
    </Button>
  );
};

export default EditLink;
