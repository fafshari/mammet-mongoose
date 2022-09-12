import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/AnimalForm'
import { AnimalLeaving, AnimalSize, SpawnTimeRange, WeatherConditions } from '../../../enums/enums'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditAnimal = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: animal, error } = useSWR(id ? `/api/animals/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!animal) return <p>Loading...</p>

  const animalForm = {
    name: animal.name,
    size: {
      value: animal.size,
      options: AnimalSize
    },
    leaving: {
      value: animal.leaving,
      options: AnimalLeaving
    },
    rare_leaving: {
      value: animal.rare_leaving,
      options: AnimalLeaving
    },
    time: {
      value: animal.time,
      options: SpawnTimeRange
    },
    weather: {
      value: animal.weather,
      options: WeatherConditions
    },
    location_x: animal.location_x,
    location_y: animal.location_y,
    image_url: animal.image_url
  }

  return <Form formId="edit-animal-form" objectForm={animalForm} forNewObject={false} />
}

export default EditAnimal
