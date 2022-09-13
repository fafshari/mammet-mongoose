import Link from 'next/link'
import ProductCard from '../../components/cards/ProductCard'
import dbConnect from '../../lib/dbConnect'
import Product from '../../models/Product'


const Index = ({ products }) => (
  <>
    <h1 className="heading">WORK IN PROGRESS</h1>
    <div className="grid wrapper">
      {products.map((product) => (
        <div key={product._id}>
          <ProductCard obj={product}>
            <Link href="/products/[id]/edit" as={`/products/${product._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <Link href="/products/[id]" as={`/products/${product._id}`}>
              <button className="btn view">View</button>
            </Link>
          </ProductCard>
        </div>
      ))}
    </div>
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
  

