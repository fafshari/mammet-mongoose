import csv from 'csvtojson'
import path from 'path'
import { promises as fs } from 'fs'
/**
 * Thank you Mienna for the logic!!!
 */
const workshopCycles = async () =>
{
    /**
     * Read CSV data into JSON objects
     */
    const publicDirectory = path.join(process.cwd(), 'public')
    const items = await csv({
        checkType: true
    }).fromFile(`${publicDirectory}/items.csv`)

    const supplyDeltas = await csv({
        checkType: true
    }).fromFile(`${publicDirectory}/delta.csv`)

    const re = new RegExp("\\d+")

    items.map((item, index) => {
        const cycle = item.SupplyPath
        if (cycle) {
            const deltas = supplyDeltas.filter((delta) => {
                return delta.D0 == cycle
            })
            const delta = deltas.length > 0 ? deltas[0] : 0

            let supply = delta.D1

            item.D1Supply = GetSupply(supply)

            // Loop through days in the week
            // If you want to have a variable length array starting at 2 for whatever reason, here:
            // [Array.from({length: 6}, (_, i) => i + 2)]
            Array([2,3,4,5,6,7]).map((day) => {
                // Get the items produced
                const craftedString = item[`D${day}Produced`]
                if (craftedString) {
                    const craft = craftedString.toString().split(',')
                    const match = craft.at(-1).match(re)
                    if (match) {
                        //console.log("Found number "+match+" in last craft of "+craft.at(-1));
                        // Update the supply amount
                        supply+=parseInt(match);
                        //console.log("supply now "+supply);
                    }
                }

                // Get the supply delta for the current day in the loop
                const supplyDelta = delta[`D${day}`]
                if (supplyDelta) {
                    const newSupply = supply + supplyDelta
                    // Update the items supply and shift for the current day in the loop
                    item[`D${day}Supply`] = GetSupply(newSupply)
                    item[`D${day}Shift`] = GetDemandShift(supply, newSupply)
                    supply = newSupply
                }
            })
        }
    })
    
    return items
}

const  GetSupply = (supply) =>
{
    const values = [
        {value: -8, name:"Nonexistent"},
        {value: 0, name:"Insufficient"},
        {value: 8, name:"Sufficient"},
        {value: 16, name:"Surplus"}
    ]
    const result = values.find(({ value }) => value === supply)
    return result ? result.name : "Overflowing"
}

const  GetDemandShift = (prevSupply, newSupply) =>
{
    const diff = newSupply - prevSupply;
    const values = [
        {value: -5, name:"Skyrocketing"},
        {value: -1, name:"Increasing"},
        {value: 2, name:"None"},
        {value: 6, name:"Decreasing"}
    ]
    const result = values.find(({ value }) => value === diff)
    return result ? result.name : "Plummeting"
}

export default workshopCycles