/** @jsx jsx */
import { jsx, Text, Alert, Close } from 'theme-ui';

const Banner = ({ close, content }) => {
  return (
    <Alert
      sx={{
        px: 3,
        py: 0,
        borderRadius: 0,
        bg: 'surface',
        borderColor: 'surface',
      }}
    >
      <Close sx={{ color: 'muted' }} onClick={close} />
      {typeof content === 'string' ? (
        <Text sx={{ variant: 'text.plainText', m: 'auto', fontSize: 1 }}>{content}</Text>
      ) : (
        content
      )}
    </Alert>
  );
};

export default Banner;
