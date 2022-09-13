import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Item from '../../../models/Item'
import ItemCard from '../../../components/cards/ItemCard'
import ItemTile from '../../../components/cards/ItemTile'

/* Allows you to view item card info and delete item card*/
const ItemPage = ({ item }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const itemID = router.query.id

    try {
      await fetch(`/api/items/${itemID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the item.')
    }
  }

  return (
    <div className="grid wrapper">
      <div key={item._id}>
        <ItemTile obj={item}>
          <Link href="/items/[id]/edit" as={`/items/${item._id}/edit`}>
            <button className="btn edit">Edit</button>
          </Link>
          <button className="btn delete" onClick={handleDelete}>
            Delete
          </button>
        </ItemTile>
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const item = await Item.findById(params.id).lean()
  item._id = item._id.toString()

  return { props: { item } }
}

export default ItemPage
