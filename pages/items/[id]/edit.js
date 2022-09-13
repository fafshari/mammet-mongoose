import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/forms/ItemForm'
import { ItemType } from '../../../enums/enums'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditItem = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: item, error } = useSWR(id ? `/api/items/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!item) return <p>Loading...</p>

  const itemForm = {
    name: item.name,
    item_type: {
      value: item.item_type,
      options: ItemType
    },
    description: item.description,
    untradable: item.untradable,
    unique: item.unique,
    image_url: item.image_url
  }

  return <Form formId="edit-item-form" objectForm={itemForm} forNewObject={false} />
}

export default EditItem
