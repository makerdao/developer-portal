/** @jsx jsx */
import { jsx, Text, Alert } from 'theme-ui';

const Banner = ({ content }) => {
  return (
    <Alert
      sx={{
        borderRadius: 0,
        bg: 'surface',
        borderColor: 'surface',
        px: 0,
      }}
    >
      {typeof content === 'string' ? (
        <Text sx={{ m: 'auto', fontSize: 2, fontWeight: 'body' }}>{content}</Text>
      ) : (
        content
      )}
    </Alert>
  );
};

export default Banner;
