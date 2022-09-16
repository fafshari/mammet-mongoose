import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Item from '../../models/Item'
import ItemTile from '../../components/tiles/ItemTile'
import TileViewer from '../../components/tiles/TileViewer'
import { useState } from 'react'
import TileBrowser from '../../components/tiles/TileBrowser'

const Index = ({ items }) => {

  const [selectedItem, setItem] = useState(items[0])

  const handleClick = (e, data) => {
    setItem(data)
  }

  return (
    <div className="site-wrapper">
    <h1 className="mt-6 mb-4 text-4xl">Items</h1>
      <TileBrowser 
        selectedItem={selectedItem}
        items={items}
        tileOnClick={handleClick}
      />
    </div>
    )
  }
  
  /* Retrieves data from mongodb database */
  export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Item.find({})
    const items = result.map((doc) => {
      const item = doc.toObject()
      item._id = item._id.toString()
      return item
    })
  
    return { props: { items: items } }
  }
  
  export default Index
  

