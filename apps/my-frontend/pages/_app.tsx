import Layout from '../components/layout/layout';
import Document, { Html, Head, Main, NextScript } from "next/document";

import { ThemeProvider } from 'next-themes';
import './styles.css';
import Header from '../components/header/header';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default CustomApp;
