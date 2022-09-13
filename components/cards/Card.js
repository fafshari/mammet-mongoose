const Card = ({ obj, children }) => {
    
    return (
        <div className="card">
            <img src={obj.image_url} />
            <h4 className="card-name">{obj.name}</h4>
            <div className="main-content">
                <p className="card-name">{obj.name_content}</p>

                {obj.meta.map((meta, index) => {
                    return (
                        <div key={index} className="meta-info info">
                            <h4>{meta.label}</h4>
                            <p className="label">{meta.value}</p>
                        </div>
                    )
                })}

                <div className="btn-container">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card