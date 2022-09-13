import Link from 'next/link'
import AnimalCard from '../components/cards/AnimalCard'
import ItemCard from '../components/cards/ItemCard'
import ItemTile from '../components/tiles/ItemTile'
import ProductCard from '../components/cards/ProductCard'
import dbConnect from '../lib/dbConnect'
import Animal from '../models/Animal'
import Item from '../models/Item'
import Product from '../models/Product'
import TileViewer from '../components/tiles/TileViewer'
import { useState } from 'react'


const Index = ({ animals, items, products }) => {
  
  const [selectedItem, setItem] = useState(items[0])

  const handleClick = (e, data) => {
    setItem(data)
  }

  return (
  <>
    <h1 className="heading">Animals</h1>
    <div className="grid wrapper">
      {animals.map((animal) => {
        return (
          <div key={animal._id}>
            <AnimalCard obj={animal}>
              <Link href="/animals/[id]/edit" as={`/animals/${animal._id}/edit`}>
                <button className="btn edit">Edit</button>
              </Link>
              <Link href="/animals/[id]" as={`/animals/${animal._id}`}>
                <button className="btn view">View</button>
              </Link>
            </AnimalCard>
          </div>
        )
      })}
      <div key={1}>
        <div className="card card-add">
          <Link href="/animals/new" as={`/animals/new`}>
            <button className="btn add">+</button>
          </Link>
        </div>
      </div>
    </div>
    <h1 className="heading">Items</h1>
    <TileViewer obj={selectedItem}></TileViewer>
    <div className="grid wrapper tiles">
      {items.map((item) => (
        <div key={item._id}>
          <ItemTile className={selectedItem === item ? 'selected' : ''} obj={item} onClick={((e) => handleClick(e, item))}>
            <Link href="/items/[id]/edit" as={`/items/${item._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <Link href="/items/[id]" as={`/items/${item._id}`}>
              <button className="btn view">View</button>
            </Link>
          </ItemTile>
        </div>
      ))}
      <div key={0}>
          <div className="tile card-add">
                <Link href="/items/new" as={`/items/new`}>
                  <button className="btn add">+</button>
                </Link>
          </div>
      </div>
    </div>
    <h1 className="heading">Products</h1>
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
      <div key={0}>
        <div className="card card-add">
              <Link href="/products/new" as={`/products/new`}>
                <button className="btn add">+</button>
              </Link>
        </div>
      </div>
    </div>
  </>
)}

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
  
  result = await Item.find({})
  const items = result.map((doc) => {
    const item = doc.toObject()
    item._id = item._id.toString()
    return item
  })

  result = await Product.find({})
  const products = result.map((doc) => {
    const product = doc.toObject()
    product._id = product._id.toString()
    return product
  })

  return { props: { 
    animals: animals, 
    items: items,
    products: products 
  } }
}

export default Index
