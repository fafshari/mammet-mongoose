import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Product from '../../../models/Product'

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
      <div className="card">
        <h5 className="car-name">{product.name}</h5>
        <div className="main-content">
            <p className="card-name">{product.name}</p>
            <p className="card-subtitle">Time: {product.time}</p>

            {/* Extra Pet Info: Likes and Dislikes */}
            <div className="meta-info info">
                <p className="label">Metric 1</p>
                <ul>
                {/* {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                ))} */}
                </ul>
            </div>
            <div className="meta-info info">
                <p className="label">Metric 2</p>
                <ul>
                {/* {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                ))} */}
                </ul>
            </div>

          <div className="btn-container">
            <Link href="/products/[id]/edit" as={`/products/${product._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
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
