import React from 'react';
import { render, screen } from 'render';
import App from '../pages';
import * as nextRouter from 'next/router';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/' }));

test('basic rendering', async () => {
  render(<App />);
  expect(screen.getByRole('button')).toHaveTextContent('Connect Wallet');
});
