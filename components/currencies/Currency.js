import Image from "next/image"
import { IslandCurrency } from "../../enums/enums"

const Currency = ({name, sell_price}) => {

    const asset_map = IslandCurrency.reduce((acc, value) => {
        return {...acc, [value]: ''}
    }, {})
    asset_map[IslandCurrency[0]] = "65096.png"
    asset_map[IslandCurrency[1]] = "65097.png"

    return (
        <>
            {sell_price > 0 &&
                <>
                    <span className="text-xl font-bold">{sell_price}</span>
                    <Image src={`/images/${asset_map[name]}`} width="48" height="48"/>
                </>
            }
        </>
    )
}

export default Currency