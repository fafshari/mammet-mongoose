import Link from 'next/link'
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
  

