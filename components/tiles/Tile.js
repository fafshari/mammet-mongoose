const Tile = ({ obj, onClick, className }) => {

    return (
        <div className={`inline-block relative w-20 h-20 tile ${className}`} onClick={onClick}>
            <img src={obj.image_url} />
        </div>
    )
}

export default Tile