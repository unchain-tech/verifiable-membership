import type { AppProps } from 'next/app';
import { FC } from 'react';

import '/public/styles/globals.css';

export const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
