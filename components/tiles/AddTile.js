import Link from "next/link"

const AddTile = ({href}) => {
  return (
    <div className="card relative inline-block bg-emerald-500 w-20 h-20 overflow-hidden rounded-lg border-slate-700 text-slate-100 m-2 transition-all shadow group hover:bg-emerald-700">
      <Link href={href} as={href}>
        <button className="w-full h-full object-cover text-5xl">+</button>
      </Link>
    </div>
  )
}

export default AddTile