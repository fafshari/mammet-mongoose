import { Schema, models, model } from 'mongoose'
import { IslandCurrency, ItemAttainability, ItemType, ItemUsability } from '../enums/enums'

const ItemMeta = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: Schema.Types.Mixed,
    required: true
  },
  description: {
    type: String
  }
}, { _id : false })

const ItemSchema = new Schema({
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
  },
  sell_price: {
    type: Number,
    default: 0
  },
  sell_currency: {
    type: String,
    enum: IslandCurrency
  },
  attainability: {
    type: [ItemAttainability],
    required: true
  },
  usability: {
    type: [ItemUsability],
    required: true
  },
  custom_meta: {
    type: [ItemMeta],
    default: []
  }
})

export default models.Item || model('Item', ItemSchema)
