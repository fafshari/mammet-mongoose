import ItemForm from '../../components/forms/ItemForm'
import { ItemType } from '../../enums/enums'

const NewItem = () => {
  const itemForm = {
    name: '',
    item_type: {
      value: null,
      options: ItemType
    },
    description: '',
    iamge_url: '',
    untradable: true,
    unique: false
  }

  return <ItemForm formId="add-item-form" objectForm={itemForm} />
}

export default NewItem
