import Head from 'next/head';

import { FC, ReactNode } from 'react';

type Props = {
  pageTitle: string;
  children: ReactNode;
};

export const Layout: FC<Props> = ({ pageTitle, children }) => {
  const siteTitle = 'UNCHAIN';
  const subTitle = 'gm, world';

  return (
    <>
      <Head>
        <title>
          {pageTitle
            ? `${pageTitle} | ${siteTitle}`
            : `${siteTitle} | ${subTitle}`}
        </title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content="unchain.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="UNCHAIN" />
        <meta
          property="og:image"
          content="https://www.unchain.tech/UNCHAIN_banner.png"
        />
        <meta
          property="og:description"
          content="on-chain verifiable credentials for UNCHAIN members."
        />
        <meta
          name="description"
          content="on-chain verifiable credentials for UNCHAIN members."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@zsh0x" />
      </Head>

      <main>
        <div id="body">{children}</div>
      </main>
    </>
  );
};

export default Layout;
