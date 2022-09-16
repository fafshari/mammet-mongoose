import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/cards/Card'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mammet</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/animals">
            <a>Animals</a>
          </Link>
          <Link href="/items">
            <a>Items</a>
          </Link>
          <Link href="/products">
            <a>Products</a>
          </Link>
        </div>

        <img
          id="title"
          src="https://media.discordapp.net/attachments/640978235382956064/1018682382498418728/unknown.png?width=321&height=173"
          alt="mammet logo"
        ></img>
      </div>
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
