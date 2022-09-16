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

            let supply = delta.D1 // Squid = -8 

            item.D1Supply = GetSupply(supply)
            const eowsupply = GetEndOfWeekSupply(item["Last Week's Supply Paths"]) // Squid = -8
            if (eowsupply - supply == -2)
                console.log(item.Item)
            item.D1Shift = eowsupply - supply == -2 ? "None" : GetDemandShift(eowsupply, supply) 

            // Loop through days in the week
            // If you want to have a variable length array starting at 2 for whatever reason, here:
            // 
            Array.from({length: 6}, (_, i) => i + 2).map((day) => {
                // Get the items produced
                const craftedString = item[`D${day}Produced`]
                if (craftedString!=="") {
                    const craft = craftedString.toString().split(',')
                    const match = craft.at(-1).match(re)
                    if (match) {
                        console.log("Found number "+match+" in last craft of "+craft.at(-1));
                        // Update the supply amount
                        supply+=parseInt(match);
                        console.log("supply now "+supply);
                    }
                }

                // Get the supply delta for the current day in the loop
                const supplyDelta = delta[`D${day}`]
                if (supplyDelta !== "") {
                    const newSupply = supply + supplyDelta
                    // Update the items supply and shift for the current day in the loop
                    item[`D${day}Supply`] = GetSupply(newSupply)
                    item[`D${day}Shift`] = GetDemandShift(supply, newSupply)
                    supply = newSupply
                }
            })
        }
        return item;
    })
    
    return items
}

const  GetSupply = (supply) =>
{
    return supply < -8 ? "Nonexisting" : 
        supply < 0 ? "Insufficient" :
        supply < 8 ? "Sufficient" : 
        supply < 16 ? "Surplus" : "Overflowing"
}

const  GetDemandShift = (prevSupply, newSupply) =>
{
    const diff = newSupply - prevSupply;
    return  diff < -5 ? "Skyrocketing" :
            diff < -1 ? "Increasing" :
            diff < 2 ? "None" :
            diff < 6 ? "Decreasing" : "Plummeting"
}

const GetEndOfWeekSupply = (path) =>
{
    return  path === "Cycle 7 Strong" ? -15 :
            path === "Cycle 7 Weak" ? -8 :
            path.includes("Weak") ? 2 : 0
}

export default workshopCycles