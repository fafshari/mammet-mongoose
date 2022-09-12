import mongoose from 'mongoose'
import { SpawnTimeRange, AnimalLeaving, WeatherConditions } from '../enums/enums'

/* AnimalSchema will correspond to a collection in your MongoDB database. */
const AnimalSchema = new mongoose.Schema({
  name: {
    /* The name of this animal */

    type: String,
    required: [true, 'Please provide a name for this animal.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  size: {
    /* The size of this animal */

    type: String,
    required: [true, "Please provide the animal size"],
    enum: ['Small', 'Medium', 'Large']
  },
  leaving: {
    /* The leaving of your animal */

    type: String,
    enum: AnimalLeaving,
    required: [true, 'Please specify the leaving of your animal.'],
  },
  rare_leaving: {
    /* The rare leaving of your animal */

    type: String,
    enum: AnimalLeaving,
    required: [true, 'Please specify the rare leaving of your animal.'],
  },
  location_x: {
    type: Number,
  },
  location_y: {
    type: Number,
  },
  time: {
    type: String
  },
  weather: {
    type: String
  },
  image_url: {
    /* Url to animal image */
    type: String,
  }
})

export default mongoose.models.Animal || mongoose.model('Animal', AnimalSchema)
