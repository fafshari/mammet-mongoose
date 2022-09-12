import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../../lib/dbConnect'
import Animal from '../../../models/Animal'

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
      <div className="card">
        <img src={animal.image_url} />
        <h4 className="card-name">{animal.name}</h4>
        <div className="main-content">
            <p className="card-name">{animal.name}</p>

            <div className="meta-info info">
                <p className="label">Metric 1</p>
                {/* {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                ))} */}
            </div>
            <div className="meta-info info">
                <p className="label">Metric 2</p>
                {/* {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                ))} */}
            </div>

          <div className="btn-container">
            <Link href="/animals/[id]/edit" as={`/animals/${animal._id}/edit`}>
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

  const animal = await Animal.findById(params.id).lean()
  animal._id = animal._id.toString()

  return { props: { animal } }
}

export default AnimalPage