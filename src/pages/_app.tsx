// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import Head from 'next/head'
import { Fragment } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"></link>
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp