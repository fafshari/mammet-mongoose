const Tile = ({ obj, children }) => {

    return (
        <div className="tile">
            <img src={obj.image_url} />
            <div className="tooltip">
                <img src={obj.image_url} />
                <h3 className="tile-name">{obj.name}</h3>
                <h4 className="tile-subtitle">{obj.subtitle}</h4>
                <p>{obj.description}</p>
                <div class="tile-meta-list">
                    {obj.meta.map((meta, index) => {
                        if (meta.value) {
                            return (
                                <div key={index} className="meta-info info">
                                    <h4>{meta.label}</h4>
                                    <p className="label">{meta.value}</p>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className="btn-container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Tile