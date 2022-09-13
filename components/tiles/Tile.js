const Tile = ({ obj, children, onClick, className }) => {

    return (
        <div className={`tile ${className}`} onClick={onClick}>
            <img src={obj.image_url} />
        </div>
    )
}

export default Tile