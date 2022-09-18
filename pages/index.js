import Link from 'next/link'
import AnimalCard from '../components/cards/AnimalCard'
import ItemTile from '../components/tiles/ItemTile'
import ProductCard from '../components/cards/ProductCard'
import dbConnect from '../lib/dbConnect'
import Animal from '../models/Animal'
import Item from '../models/Item'
import Product from '../models/Product'
import TileViewer from '../components/tiles/TileViewer'
import { useEffect, useState } from 'react'
import Currency from '../components/currencies/Currency'
import Button from '../components/Button'
import AddCard from '../components/cards/AddCard'
import TileBrowser from '../components/tiles/TileBrowser'
import workshopCycles from '../lib/workshopCycles'


const Index = ({ animals, items, products, workshop_data }) => {
  
  const [selectedItem, setItem] = useState(items[0])
  const [workshopData, setWorkshopData] = useState(workshop_data)

  const handleClick = (e, data) => {
    console.log(data)
    setItem(data)
  }

  return (
  <div className="max-w-6xl mx-auto">
    <h1 className="mt-6 mb-4 text-4xl ">Animals</h1>
    <div className="flex flex-wrap justify-center">
      {animals.map((animal) => {
        return (
          <div key={animal._id}>
            <AnimalCard obj={animal}>
              <Link href="/animals/[id]/edit" as={`/animals/${animal._id}/edit`} passHref>
                <Button type="edit">Edit</Button> 
              </Link>
              <Link href="/animals/[id]" as={`/animals/${animal._id}`} passHref>
                <Button className="ml-3" type="view">View</Button> 
              </Link>
            </AnimalCard>
          </div>
        )
      })}
    </div>
    <h1 className="mt-6 mb-4 text-4xl">Items</h1>
    {selectedItem && 
      <TileBrowser 
        selectedItem={selectedItem}
        items={items}
        tileOnClick={handleClick}
      />
    }
    <h1 className="mt-6 mb-4 text-4xl">Products</h1>
    <div className="flex flex-wrap justify-center">
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
  </div>
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

  const data = await workshopCycles()
  console.log(data)

  return { props: { 
    animals: animals, 
    items: items,
    products: products,
    workshop_data: data
  } }
}

export default Index
