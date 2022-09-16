import React from "react"

const Button = React.forwardRef(({className, children, type, onClick, href }, ref) => {

    const types = {
        edit:   "border-emerald-400 hover:bg-emerald-700 hover:border-emerald-600",
        view:   "border-indigo-400 hover:bg-indigo-700 hover:border-indigo-600",
        delete: "border-rose-400 hover:bg-rose-700 hover:border-rose-600"
    }

    return href ?
    (
        <a href={href} onClick={onClick} ref={ref}>
            <button className={`cursor-pointer bg-transparent outline-0 border-2 rounded-md p-2 px-3 font-semibold tracking-tight text-sm text-slate-50 uppercase transition-all ${types[type]} ${className}`}>{children}</button>
        </a>
    )
    : (
        <button className={`cursor-pointer bg-transparent outline-0 border-2 rounded-md p-2 px-3 font-semibold tracking-tight text-sm text-slate-50 uppercase transition-all ${types[type]} ${className}`}>{children}</button>
    )
})

export default Button 