import { apiProxy } from 'next-tinacms-github';

export default async (req, res) => {
  try {
    const result = await apiProxy(process.env.SIGNING_KEY)(req, res);
    return result;
  } catch (e) {
    console.error('Error with github apiProxy', e);
    return res.status(500).json({
      error: {
        code: 'unexpected_error',
        message: 'An unexpected error occurred with the github apiProxy.',
      },
    });
  }
};
