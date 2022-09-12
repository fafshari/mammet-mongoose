import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Animal from '../models/Animal'
import Product from '../models/Product'

const Index = ({ animals, products }) => (
  <>
    <h1 className="heading">Animals</h1>
    <div className="grid wrapper">
    {animals.map((animal) => (
        <div key={animal._id}>
          <div className="card">
            <img src={animal.image_url} />
            <h4 className="card-name">{animal.name}</h4>
            <div className="main-content">
              <p className="card-name">{animal.name} ({animal.size[0]})</p>
              <p className="card-subtitle">Time: {animal.time ?? 'Anytime'}</p>
              <p className="card-subtitle">Weather: {animal.weather ?? 'N/A'}</p>

              <div className="meta-info info">
                <h4>Leavings</h4>
                <p className="label">{animal.leaving} / {animal.rare_leaving} (rare)</p>
              </div>
              <div className="meta-info info">
                <h4>Coordinates</h4>
                <p className="label">({animal.location_x}, {animal.location_y})</p>
              </div>
  
              <div className="btn-container">
                <Link href="/animals/[id]/edit" as={`/animals/${animal._id}/edit`}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href="/animals/[id]" as={`/animals/${animal._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    ))}
    <div key={1}>
      <div className="card card-add">
            <Link href="/animals/new" as={`/animals/new`}>
              <button className="btn add">+</button>
            </Link>
      </div>
    </div>
    </div>
    <h1 className="heading">Products</h1>
    <div className="grid wrapper">
    <div key={0}>
      <div className="card card-add">
            <Link href="/products/new" as={`/products/new`}>
              <button className="btn add">+</button>
            </Link>
      </div>
    </div>
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
    </div>
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  let result = null;

  result = await Animal.find({})
  const animals = result.map((doc) => {
    const animal = doc.toObject()
    animal._id = animal._id.toString()
    return animal
  })

  result = await Product.find({})
  const products = result.map((doc) => {
    const product = doc.toObject()
    product._id = product._id.toString()
    return product
  })

  return { props: { animals: animals, products: products } }
}

export default Index
