/** @jsx jsx */
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, jsx, Card, Heading, Text, Textarea, Grid, Flex, Input } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { toMarkdownString, validateEmail } from '@utils';

const constructMarkdownString = (reaction, email, content) => {
  let rawFrontmatter;
  let rawMarkdownBody = `# ${reaction[0].toUpperCase() + reaction.slice(1)} Feedback Recieved`;
  if (email) {
    rawMarkdownBody = rawMarkdownBody.concat(`\nfrom: ${email}`);
    rawFrontmatter = { email };
  }
  if (content) rawMarkdownBody = rawMarkdownBody.concat(`\n\n${content}`);
  if (rawFrontmatter) return toMarkdownString({ rawFrontmatter, rawMarkdownBody });

  return rawMarkdownBody;
};

const Feedback = ({ route, cms }) => {
  const ref = useRef(null);
  const emailRef = useRef(null);

  const [reaction, setReaction] = useState(null);
  const [emailValid, setEmailValid] = useState(true);

  const isNegative = reaction === 'negative';
  const isPositive = reaction === 'positive';
  const isSubmitted = reaction === 'submitted';

  const { title, placeholder } = isNegative
    ? {
        title: "We're sorry this document wasn't helpful.",
        placeholder: 'Please let us know how we can improve it.',
      }
    : isPositive
    ? {
        title: 'Glad this document was helpful.',
        placeholder:
          'Please let us know if you have any suggestions how we can make it even better.',
      }
    : isSubmitted
    ? { title: 'Thank you for your feedback' }
    : { title: 'Was this document helpful?' };

  const handleOnChange = (value) => {
    if (!validateEmail(value) && value) setEmailValid(false);
    else if (validateEmail(value) || !value) setEmailValid(true);
  };

  const sendFeedback = useCallback(async () => {
    const markdown = constructMarkdownString(reaction, emailRef.current?.value, ref.current?.value);

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
    setEmailValid(true);
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
          <Icon sx={{ mr: 2 }} color="primary" name={'document'}></Icon>
          <Heading variant="microHeading">{title}</Heading>
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
            variant={'forms.contrastForm'}
            sx={{
              mb: 2,
              bg: 'surface',
              borderColor: 'muted',
            }}
          ></Textarea>
          <Text sx={{ fontWeight: 'body', mb: 2, mt: 3 }} variant="caps">
            E-MAIL (OPTIONAL)
          </Text>
          <Grid columns={'2fr 1fr'} sx={{ width: '100%' }}>
            <Flex sx={{ flexDirection: 'column' }}>
              <Input
                sx={{
                  mr: 3,
                  fontFamily: 'body',
                  fontSize: 2,
                  bg: 'surface',
                  borderColor: 'muted',
                }}
                type="email"
                aria-label="Feedback email"
                placeholder="Enter your e-mail address if you would like to be in contact."
                variant={'forms.contrastForm'}
                ref={emailRef}
                onChange={(e) => handleOnChange(e.target.value)}
              ></Input>
            </Flex>
            <Grid columns={2}>
              <Button variant="small" onClick={sendFeedback} disabled={!emailValid}>
                Submit
              </Button>
              <Button
                variant="contrastButtonSmall"
                onClick={() => setReaction(null) || setEmailValid(true)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          {!emailValid && (
            <Text variant="plainText" sx={{ fontSize: 1, color: 'primary' }}>
              Please enter a valid email address
            </Text>
          )}
        </Flex>
      )}
    </Card>
  );
};

export default Feedback;
