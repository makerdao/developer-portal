import { useRef, useState } from 'react';
import { validateEmail } from '@utils';

const useAddSubscriberEmail = ({ tags, metadata } = {}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!validateEmail(inputEl.current.value))
      return setErrorMessage('Please enter a valid email address.');
    setLoading(true);

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: inputEl.current.value,
        ...(tags && { tags }),
        ...(metadata && { metadata }),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setLoading(false);
    inputEl.current.value = '';
    const { error } = await res.json();

    if (error) {
      console.error(error);
      error.includes('already subscribed')
        ? setErrorMessage('This email is already subscribed')
        : setErrorMessage('Please check email and try again');
    } else {
      setSuccess(true);
    }
  };

  return { inputEl, subscribe, loading, success, errorMessage };
};

export default useAddSubscriberEmail;
