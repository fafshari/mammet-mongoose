import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'
import ProductCard from '../../../components/cards/ProductCard'

/* Allows you to view product card info and delete product card*/
const ProductPage = ({ product }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const productID = router.query.id

    try {
      await fetch(`/api/products/${productID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the product.')
    }
  }

  return (
    <div key={product._id}>
      <ProductCard obj={product}>
        <Link href="/products/[id]/edit" as={`/products/${product._id}/edit`}>
          <button className="btn edit">Edit</button>
        </Link>
        <button className="btn delete" onClick={handleDelete}>
          Delete
        </button>
      </ProductCard>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const product = await Product.findById(params.id).lean()
  product._id = product._id.toString()

  return { props: { product } }
}

export default ProductPage
