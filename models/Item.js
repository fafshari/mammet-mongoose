import mongoose from 'mongoose'
import { ItemType } from '../enums/enums'

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 60
  },
  item_type: {
    type: String,
    required: true,
    enum: ItemType
  },
  description: {
    type: String,
    maxlength: 255
  },
  image_url: {
    type: String
  },
  untradable: {
    type: Boolean,
    default: true
  },
  unique: {
    type: Boolean,
    default: false
  }
})

export default mongoose.models.Item || mongoose.model('Item', ItemSchema)
