/* View details of a selected tile */
import { useEffect, useState } from 'react'

const TileViewer = ({obj}) => {

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
        <div className="tooltip-wrapper">
            <div className="tile-viewer tooltip">
                <div className="tooltip-header">
                    <img src={tile.image_url}/>
                    <h1>{tile.name}</h1>
                </div>
                <h3>{tile.subtitle}</h3>
                <p>{tile.description}</p>
            </div>
        </div>
    )
}

export default TileViewer