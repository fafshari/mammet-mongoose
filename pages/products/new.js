import ProductForm from '../../components/forms/ProductForm'

const NewProduct = () => {
  const productForm = {
    name: '',
    time: 0
  }

  return <ProductForm formId="add-product-form" objectForm={productForm} />
}

export default NewProduct
