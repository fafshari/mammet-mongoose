/* View details of a selected tile */
import Image from 'next/image'
import { useEffect, useState } from 'react'

const TileViewer = ({className, obj, topRight, children}) => {

    const [tile, setTile] = useState({
        name: obj.name,
        image_url: obj.image_url,
        description: obj.description
    })

    useEffect(() => {
        console.log("state was updated")
        setTile(obj)
    }, [obj])

    return (
        <div className={className}>
            <div className="relative w-full p-4 transition-all rounded-lg shadow bg-slate-800 border-slate-700">
                <div className="tooltip-header">
                    {tile.image_url && <Image width="64" height="64" className="mb-2" src={tile.image_url}/> }
                    <h2 className="mb-2 text-2xl">{tile.name}</h2>
                </div>
                <h4 className="font-semibold">{tile.subtitle}</h4>
                <div className="mb-4"></div>
                <p>{tile.description}</p>
                <div className="absolute flex items-center right-4 top-4 topright-container">
                    {topRight}
                </div>
                <div className="flex justify-end mt-2 right-3 bottom-3">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default TileViewer