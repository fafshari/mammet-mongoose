const Card = ({ obj, children }) => {

  return (
    <div className="relative inline-block w-64 m-2 overflow-hidden transition-all rounded-lg shadow card bg-slate-800 h-80 border-slate-700 group">
      {obj.image_url && 
        <img className="object-cover w-full h-full" src={obj.image_url} />
      }
      <h2 className="bg-dark-rgba p-2 rounded-md absolute left-3 bottom-3 text-xl [text-shadow:0_4px_8px_rgba(0,0,0,0.2)]">{obj.name}</h2>
      <div className="absolute top-0 left-0 w-full h-full p-4 transition-all opacity-0 card-content bg-dark-rgba group-hover:opacity-100">
        <p className="text-xl">{obj.name_content}</p>

        {obj.meta.map((meta, index) => {
          return (
            <div key={index} className="mt-2 meta-info info">
              <h3 className="font-semibold">{meta.label}</h3>
              <p className="text-slate-200">{meta.value}</p>
            </div>
          )
        })}

        <div className="absolute right-3 bottom-3">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card