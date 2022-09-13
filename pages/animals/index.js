import Link from 'next/link'
import AnimalCard from '../../components/cards/AnimalCard'
import dbConnect from '../../lib/dbConnect'
import Animal from '../../models/Animal'

const Index = ({ animals }) => (
    <div className="grid wrapper">
      <div key={0}>
          <div className="card card-add">
                <Link href="/animals/new" as={`/animals/new`}>
                  <button className="btn add">+</button>
                </Link>
          </div>
      </div>
      {animals.map((animal) => (
        
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
        
      ))}
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
  

