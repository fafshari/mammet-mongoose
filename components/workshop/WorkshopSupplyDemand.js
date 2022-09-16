
const WorkShopSupplyDemand = ({workshop_data}) => {

    const headers = Object.keys(workshop_data[0])

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 max-h-[80vh] scrollbar scrollbar-thumb-slate-600 scrollbar-track-slate-300">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center border border-slate-600">
                        <thead className="border-b border-slate-600 ">
                            <tr>
                            {headers.map((col, i) => {
                                return (
                                    <th key={i} scope="col" className="px-6 py-4 font-bold text-gray-200 border-r text-md border-slate-600 whitespace-nowrap bg-slate-800">
                                        {col}
                                    </th>
                                )
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workshop_data.map((item, i) => {
                                    return (
                                        <tr key={i} className="border-b border-slate-600 ">
                                            {
                                                Object.values(item).map((value, i) => {
                                                    return (
                                                        <td key={i} className="px-6 py-4 text-sm font-medium border-r whitespace-nowrap text-slate-100 border-slate-600">{value}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkShopSupplyDemand