import Image from "next/image"

const Tile = ({ obj, onClick, className }) => {

    return (
        <div className={`inline-block relative w-20 h-20 tile ${className}`} onClick={onClick}>
            <Image layout='fill' src={obj.image_url} />
        </div>
    )
}

export default Tile