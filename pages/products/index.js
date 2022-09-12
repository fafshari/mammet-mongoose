import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Product from '../../models/Product'


const Index = ({ products }) => (
    <>
    <h1>WORK IN PROGRESS</h1>
      {/* Create a card for each pet */}
      {products.map((product) => (
        <div key={product._id}>
          <div className="card">
            <img src={product.image_url} />
            <h5 className="card-name">{product.name}</h5>
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
                <Link href="/products/[id]" as={`/products/${product._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
  
  /* Retrieves data from mongodb database */
  export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Product.find({})
    const products = result.map((doc) => {
      const product = doc.toObject()
      product._id = product._id.toString()
      return product
    })
  
    return { props: { products: products } }
  }
  
  export default Index
  

