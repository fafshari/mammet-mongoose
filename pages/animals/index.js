import Link from 'next/link'
import Button from '../../components/Button'
import AddCard from '../../components/cards/AddCard'
import AnimalCard from '../../components/cards/AnimalCard'
import dbConnect from '../../lib/dbConnect'
import Animal from '../../models/Animal'

const Index = ({ animals }) => (
    <div className="max-w-6xl mx-auto">
<h1 className="text-4xl">Animals</h1>
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
      <div key={1}>
        <AddCard href="/animals/new" />
      </div>
    </div>
    </div>
  )
  
  /* Retrieves data from mongodb database */
  export async function getServerSideProps() {
    await dbConnect()
  
    /* find all the data in our database */
    const result = await Animal.find({})
    const animals = result.map((doc) => {
      const animal = doc.toObject()
      animal._id = animal._id.toString()
      return animal
    })
  
    return { props: { animals: animals } }
  }
  
  export default Index
  

