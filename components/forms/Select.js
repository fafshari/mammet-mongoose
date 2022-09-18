
const Select = ({
    id, 
    name, 
    label,
    elements,
    required = false, 
    defaultValue = "",
    onChange = () => {},
    className
}) => {
return (
    <div className={`${className} mb-6`}>
        <label htmlFor={id}>{label}</label>
        <select name={name} id={id} onChange={onChange} defaultValue={defaultValue} required={required} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {
            elements.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
            })
            }
        </select>
    </div>
)
}

export default Select