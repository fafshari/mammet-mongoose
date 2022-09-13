import Tile from "./Tile"

const ItemTile = ({obj, children}) => {
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
        <Tile obj={tile}>{children}</Tile>
    )
}

export default ItemTile