import Card from "./Card"

const ItemCard = ({ obj, children }) => {

    const item = obj
    item.name_content = item.description
    item.meta = []
    item.meta.push({
        label: 'Type',
        value: item.item_type
    })

    if (item.untradable)
        item.meta.push({
            label: 'Untradable',
            value: ''
        })

    if (item.unique)
        item.meta.push({
            label: 'Unique',
            value: ''
        })

    return (
        <Card obj={item}>
            {children}
        </Card>
    )
}

export default ItemCard