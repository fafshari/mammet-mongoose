
const WorkShopSupplyDemand = ({workshop_data}) => {

    const headers = Object.keys(workshop_data[0])

    return (
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 max-h-[80vh] scrollbar scrollbar-thumb-slate-600 scrollbar-track-slate-300">
                <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="overflow-hidden">
                        <table class="min-w-full border border-slate-600  text-center">
                        <thead class="border-b border-slate-600 ">
                            <tr>
                            {headers.map((col) => {
                                return (
                                    <th scope="col" class="text-md font-bold text-gray-200 px-6 py-4 border-r border-slate-600 whitespace-nowrap bg-slate-800">
                                        {col}
                                    </th>
                                )
                            })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workshop_data.map((item) => {
                                    return (
                                        <tr class="border-b border-slate-600 ">
                                            {
                                                Object.values(item).map((value) => {
                                                    return (
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-100 border-r border-slate-600">{value}</td>
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