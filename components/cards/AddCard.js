import Link from "next/link"

const AddCard = ({href}) => {
  return (
    <div className="card relative inline-block bg-emerald-500 w-64 h-80 overflow-hidden rounded-lg border-slate-700 text-slate-100 m-2 transition-all shadow group hover:bg-emerald-700">
      <Link href={href} as={href}>
        <button className="w-full h-full object-cover text-9xl">+</button>
      </Link>
    </div>
  )
}

export default AddCard