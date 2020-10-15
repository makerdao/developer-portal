import { useRef, useState } from 'react';

const useAddSubscriberEmail = ({ tags, metadata } = {}) => {
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);

  const subscribe = async (e) => {
    e.preventDefault();
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
    }
  };

  return { inputEl, subscribe, loading };
};

export default useAddSubscriberEmail;
