
import { useState } from 'react'
import WorkShopSupplyDemand from '../../components/workshop/WorkshopSupplyDemand'
import workshopCycles from '../../lib/workshopCycles'


const Workshop = ({ workshop_data }) => {
  
  const [workshopData, setWorkshopData] = useState(workshop_data)

  return (
    <div>
        <div className="max-w-6xl mx-auto">
            <h1 className="mt-6 mb-4 text-4xl">Workshop</h1>
        </div>
        <WorkShopSupplyDemand workshop_data={workshop_data} />
    </div>
)}

export async function getServerSideProps() {
  
  const data = await workshopCycles()
  console.log(data)

  return { props: { 
    workshop_data: data
  } }
}

export default Workshop
