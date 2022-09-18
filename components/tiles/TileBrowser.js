import Link from "next/link"
import Button from "../Button"
import Currency from "../currencies/Currency"
import AddTile from "./AddTile"
import ItemTile from "./ItemTile"
import TileViewer from "./TileViewer"

const TileBrowser = ({selectedItem, items, tileOnClick}) => {

    return (
        <div className="flex flex-col flex-wrap justify-center lg:ml-4 lg:flex-row lg:gap-4">
            <TileViewer
                className="mb-4 transition-all lg:mb-0 basis-2/5 lg:-ml-4" 
                obj={selectedItem}
                topRight={
                    <Currency name={selectedItem?.sell_currency} sell_price={selectedItem?.sell_price} />
                }
            >
            <Link href="/items/[id]/edit" as={`/items/${selectedItem?._id}/edit`} passHref>
                <Button type="edit">Edit</Button>
            </Link>
            <Link href="/items/[id]" as={`/items/${selectedItem?._id}`} passHref>
                <Button className="ml-2" type="view">View</Button>
            </Link>
            </TileViewer>
            <div className="flex flex-wrap justify-center p-2 overflow-auto rounded-lg bg-slate-800 basis-3/5 max-h-40vh scrollbar scrollbar-thumb-indigo-900 scrollbar-track-indigo-300">
                {items.map((item) => (
                    <div key={item._id} className="m-2.5">
                        <ItemTile className={selectedItem === item ? 'selected' : ''} obj={item} onClick={((e) => tileOnClick(e, item))}>
                        </ItemTile>
                    </div>
                ))}
                <div key={0}>
                    <AddTile href="/items/new"/>
                </div>
            </div>
        </div>
    )
}

export default TileBrowser