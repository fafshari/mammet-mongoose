import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-gray-900 font-sans text-slate-100 ">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
