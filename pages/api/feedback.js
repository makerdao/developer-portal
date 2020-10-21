import { FEEDBACK_ENDPOINT } from '../../utils/constants';

export default async (req, res) => {
  const { reaction, comment, tag, location } = req.body;

  // //Validate fields
  // if (!email) {
  //   return res.status(400).json({ error: 'Email is required' });
  // }

  if (req.method === 'POST') {
    try {
      const username = process.env.USERNAME_ISSUES;
      const password = process.env.GITHUB_ACCESS_TOKEN;
      const repo = process.env.REPO_ISSUES;

      if (!username || !password || !repo) {
        res
          .status(501)
          .json({ message: 'Username, password and repo must be added to the .env file' });
      }

      const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

      const response = await fetch(`${FEEDBACK_ENDPOINT}/${username}/${repo}/issues`, {
        data: {
          title: `${reaction} comment on ${location}`,
          body: comment,
          labels: [tag, location],
        },
        headers: {
          Authorization: `Basic ${token}`,
        },
        method: 'POST',
      });

      console.log('response:', response.text());
      res.status(200).json({ message: 'sent' });
    } catch (error) {
      res.status(400).json({ message: 'error' });
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ message: 'only post methods supported' });
  }
};
