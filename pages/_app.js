import '../css/style.css'
import '../css/form.css'
import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/cards/Card'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mammet</title>
      </Head>

      <NavBar/>

      <div className="container px-4 mx-auto">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
