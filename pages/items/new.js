import ItemForm from '../../components/forms/ItemForm'
import { 
  IslandCurrency, 
  ItemAttainability, 
  ItemType, 
  ItemUsability 
} from '../../enums/enums'

const NewItem = () => {
  const itemForm = {
    name: '',
    item_type: {
      value: null,
      options: ItemType
    },
    description: '',
    image_url: '',
    untradable: true,
    unique: false,
    sell_price: 0,
    sell_currency: {
      value: null,
      options: IslandCurrency
    },
    attainability: {
      value: [],
      options: ItemAttainability
    },
    usability: {
      value: [],
      options: ItemUsability
    },
    custom_meta: {
      value: [],
      meta_fields: {
        key: '',
        value: null,
        description: ''
      }
    }
  }

  return <ItemForm formId="add-item-form" objectForm={itemForm} />
}

export default NewItem
