/** @jsx jsx */
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Button,
  jsx,
  Card,
  Heading,
  Text,
  Textarea,
  Grid,
  Flex,
  Input,
  Link as ThemeLink,
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { toMarkdownString, capitalize } from '@utils';

const constructMarkdownString = (reaction, handle, content) => {
  let rawFrontmatter;
  let rawMarkdownBody = `# ${capitalize(reaction)} Feedback Recieved`;
  if (handle) {
    rawMarkdownBody = rawMarkdownBody.concat(`\nfrom Rocket Chat user: ${handle}`);
    rawFrontmatter = { handle };
  }
  if (content) rawMarkdownBody = rawMarkdownBody.concat(`\n\n${content}`);
  if (rawFrontmatter) return toMarkdownString({ rawFrontmatter, rawMarkdownBody });

  return rawMarkdownBody;
};

const Feedback = ({ route, cms, mobile }) => {
  const ref = useRef(null);
  const rcRef = useRef(null);

  const [reaction, setReaction] = useState(null);

  const isNegative = reaction === 'negative';
  const isPositive = reaction === 'positive';
  const isSubmitted = reaction === 'submitted';

  const { title, placeholder } = isNegative
    ? {
        title: mobile ? "We're sorry" : "We're sorry this document wasn't helpful.",
        placeholder: 'Please let us know how we can improve it.',
      }
    : isPositive
    ? {
        title: mobile ? 'Glad to hear' : 'Glad this document was helpful.',
        placeholder: 'Please let us know how we can make it even better.',
      }
    : isSubmitted
    ? { title: mobile ? 'Thank you' : 'Thank you for your feedback' }
    : { title: mobile ? 'Was this helpful?' : 'Was this document helpful?' };

  const sendFeedback = useCallback(async () => {
    const markdown = constructMarkdownString(reaction, rcRef.current?.value, ref.current?.value);

    try {
      const response = await fetch(process.env.FEEDBACK_ENDPOINT || '/api/feedback', {
        body: JSON.stringify({
          reaction,
          comment: markdown,
          tags: ['feedback', window.location.pathname],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        credentials: 'same-origin',
        referrerPolicy: 'no-referrer',
      });

      if (!response.ok) {
        throw Error(response.statusText);
      }

      cms.alerts.success('Your feedback has been submitted');
      setReaction('submitted');
    } catch (err) {
      console.error(err);
      cms.alerts.error('there was an error in submitting your feedback');
    }
  }, [reaction, cms.alerts]);

  useEffect(() => {
    setReaction(null);
  }, [route]);

  return (
    <Card
      sx={{
        bg: 'background',
        border: 'light',
        borderColor: 'muted',
        borderRadius: 'small',
        width: '100%',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Icon
            sx={{ mr: 2 }}
            color="primary"
            size="auto"
            height="20px"
            width="20px"
            name="document"
          ></Icon>
          <Heading variant="smallHeading">{title}</Heading>
        </Flex>
        {isSubmitted ? (
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              bg: 'primary',
              size: 4,
              borderRadius: 'round',
              ml: 'auto',
            }}
          >
            <Icon name="checkmark" size="3" />
          </Flex>
        ) : (
          <Grid columns={2}>
            <Button
              variant="contrastButtonSmall"
              sx={{
                bg: isPositive ? 'primary' : undefined,
                color: isPositive ? 'onPrimary' : undefined,
                minWidth: 42,
              }}
              onClick={() => setReaction('positive')}
            >
              Yes
            </Button>
            <Button
              variant="contrastButtonSmall"
              sx={{
                bg: isNegative ? 'primary' : undefined,
                color: isNegative ? 'onPrimary' : undefined,
                minWidth: 42,
              }}
              onClick={() => setReaction('negative')}
            >
              No
            </Button>
          </Grid>
        )}
      </Flex>
      {(isNegative || isPositive) && (
        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text sx={{ fontWeight: 'body', mb: 2, mt: 3 }} variant="caps">
            FEEDBACK
          </Text>
          <Textarea
            aria-label="Feedback textarea"
            ref={ref}
            placeholder={placeholder}
            sx={{
              mb: 2,
              bg: 'surface',
              borderColor: 'muted',
              fontSize: 3,
            }}
          ></Textarea>
          <Text sx={{ fontWeight: 'body', mb: 2, mt: 3 }} variant="caps">
            ROCKET CHAT HANDLE (OPTIONAL)
          </Text>
          <Flex sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Input
              sx={{
                mr: 3,
                fontFamily: 'body',
                fontSize: 3,
                bg: 'surface',
                borderColor: 'muted',
                width: ['66%', '100%'],
              }}
              type="email"
              aria-label="Feedback handle"
              placeholder="Enter your Rocket Chat handle if you would like to be in contact."
              ref={rcRef}
            ></Input>
            <Button
              sx={{ px: [2, 4], width: ['33%', 'initial'] }}
              variant="small"
              onClick={sendFeedback}
            >
              Submit
            </Button>
          </Flex>
          <Flex sx={{ pt: 3, flexWrap: 'wrap' }}>
            <Text sx={{ color: 'onBackgroundMuted', pr: 3 }}>
              If you need additional help, join the Rocket Chat #dev channel.
            </Text>
            <ThemeLink href={'https://chat.makerdao.com/channel/dev'} target="_blank">
              <Flex sx={{ alignItems: 'center' }}>
                <Icon sx={{ mr: 2 }} color="primary" name="chat"></Icon>
                <Text sx={{ color: 'text', cursor: 'pointer' }}>chat.makerdao.com</Text>
              </Flex>
            </ThemeLink>
          </Flex>
        </Flex>
      )}
    </Card>
  );
};

export default Feedback;
