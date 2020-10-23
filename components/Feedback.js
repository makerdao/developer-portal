/** @jsx jsx */
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, jsx, Card, Heading, Text, Textarea, Grid, Flex } from 'theme-ui';
import { useCMS } from 'tinacms';
import { Icon } from '@makerdao/dai-ui-icons';

const Feedback = () => {
  const cms = useCMS();
  const ref = useRef(null);
  const [reaction, setReaction] = useState(null);

  const isNegative = reaction === 'negative';
  const isPositive = reaction === 'positive';
  const isSubmitted = reaction === 'submitted';

  const title = isNegative
    ? "We're sorry this document wasn't helpful"
    : isSubmitted
    ? 'Thank you for your feedback'
    : 'Was this document helpful?';

  const sendFeedback = useCallback(async () => {
    try {
      const response = await fetch(process.env.FEEDBACK_ENDPOINT || '/api/feedback', {
        body: JSON.stringify({
          reaction,
          comment: ref.current?.value === '' ? '👎' : ref.current?.value ?? '👍',
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
    if (isPositive) sendFeedback();
  }, [isPositive, sendFeedback]);

  return (
    <Card sx={{ bg: 'onBackground' }}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Heading sx={{ color: 'background' }} variant="microHeading">
          {title}
        </Heading>
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
            <Button variant="contrastButtonSmall" onClick={() => setReaction('positive')}>
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
      {isNegative && (
        <Flex sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text sx={{ color: 'background', fontWeight: 'body', mb: 2 }} variant="caps">
            FEEDBACK
          </Text>
          <Textarea
            ref={ref}
            placeholder="Please let us know how we can improve it."
            variant={'forms.contrastTextarea'}
            sx={{ mb: 2 }}
          ></Textarea>
          <Grid columns={2}>
            <Button variant="small" onClick={sendFeedback}>
              Submit
            </Button>
            <Button variant="contrastButtonSmall" onClick={() => setReaction(null)}>
              Cancel
            </Button>
          </Grid>
        </Flex>
      )}
    </Card>
  );
};

export default Feedback;
