import { FEEDBACK_ENDPOINT } from '../../utils/constants';

export default async (req, res) => {
  const { reaction, comment, tags } = req.body;

  if (!reaction) {
    return res.status(400).json({ error: "'reaction' is a required prop" });
  }

  try {
    const username = process.env.USERNAME_ISSUES;
    const password = process.env.GH_TOKEN_ISSUES;
    const repo = process.env.REPO_ISSUES;

    if (!username || !password || !repo) {
      res
        .status(501)
        .json({ message: 'Username, password and repo must be added to the .env file' });
    }

    const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    const url = `${FEEDBACK_ENDPOINT}/${repo}/issues`;

    const response = await fetch(url, {
      body: JSON.stringify({
        title: `${reaction} feedback received`,
        body: comment,
        labels: tags,
      }),
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      accept: 'application/vnd.github.v3+json',
      method: 'POST',
    });

    res.status(200).json({ message: 'sent' });
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
