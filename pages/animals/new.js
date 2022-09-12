import AnimalForm from '../../components/AnimalForm'
import { SpawnTimeRange, AnimalLeaving, WeatherConditions, AnimalSize } from '../../enums/enums'

const NewAnimal = () => {
  const animalForm = {
    name: '',
    size: {
      value: null,
      options: AnimalSize
    },
    leaving: {
      value: null,
      options: AnimalLeaving
    },
    rare_leaving: {
      value: null,
      options: AnimalLeaving
    },
    time: {
      value: null,
      options: SpawnTimeRange
    },
    weather: {
      value: null,
      options: WeatherConditions
    },
    location_x: 0,
    location_y: 0,
    image_url: ''
  }

  return <AnimalForm formId="add-animal-form" objectForm={animalForm} />
}

export default NewAnimal
