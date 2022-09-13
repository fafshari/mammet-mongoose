import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Item from '../../models/Item'
import ItemCard from '../../components/cards/ItemCard'
import ItemTile from '../../components/cards/ItemTile'

const Index = ({ items }) => (
  <>
    <h1 className="heading">Items</h1>
    <div className="grid wrapper">
      {items.map((item) => (
        <div key={item._id}>
          <ItemTile obj={item}>
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
  </>
  )
  
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
  

