import Card from "./Card"

const ProductCard = ({ obj, children }) => {

    const product = obj
    product.name_content = product.name
    product.meta = []
    product.meta.push({
        label: 'Time',
        value: obj.time
    })

    return (
        <Card obj={product}>
            {children}
        </Card>
    )
}

export default ProductCard