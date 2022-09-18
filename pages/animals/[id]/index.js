import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Animal from '../../../models/Animal'
import AnimalCard from '../../../components/cards/AnimalCard'
import Button from '../../../components/Button'

/* Allows you to view animal card info and delete animal card*/
const AnimalPage = ({ animal }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const animalID = router.query.id

    try {
      await fetch(`/api/animals/${animalID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the animal.')
    }
  }

  return (
    <div key={animal._id}>
      <AnimalCard obj={animal}>
          <Link href="/animals/[id]/edit" as={`/animals/${animal._id}/edit`} passHref>
            <Button type="edit">Edit</Button>
          </Link>
          <Button className="ml-3" type="delete" onClick={handleDelete}>Delete</Button>
      </AnimalCard>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const animal = await Animal.findById(params.id).lean()
  animal._id = animal._id.toString()

  return { props: { animal } }
}

export default AnimalPage
