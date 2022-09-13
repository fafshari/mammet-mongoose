import Tile from "./Tile"

const ItemTile = ({obj, children, onClick, className}) => {
    const tile = obj
    tile.subtitle = tile.item_type
    tile.meta = []
    tile.meta.push({
        label: 'Untradable',
        value: tile.untradable
    })
    tile.meta.push({
        label: 'Unique',
        value: tile.unique
    })
    return (
        <Tile className={className} obj={tile} onClick={onClick}>{children}</Tile>
    )
}

export default ItemTile