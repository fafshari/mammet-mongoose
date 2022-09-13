import { useRouter } from 'next/router'
import useSWR from 'swr'
import Form from '../../../components/forms/ProductForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditProduct = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: product, error } = useSWR(id ? `/api/products/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!product) return <p>Loading...</p>

  const productForm = {
    name: product.name,
    time: product.time
  }

  return <Form formId="edit-product-form" objectForm={productForm} forNewObject={false} />
}

export default EditProduct
