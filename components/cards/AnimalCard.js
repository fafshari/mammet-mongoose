import Card from "./Card"

const AnimalCard = ({ obj, children }) => {

    const animal = obj
    animal.name_content = `${animal.name} (${animal.size[0]})`
    animal.meta = []
    animal.meta.push({
        label: 'Time',
        value: animal.time ?? 'Anytime'
    })
    animal.meta.push({
        label: 'Weather',
        value: animal.weather ?? 'N/A'
    })
    animal.meta.push({
        label: 'Leavings',
        value: `${animal.leaving} / ${animal.rare_leaving} (rare)`
    })
    animal.meta.push({
        label: 'Coordinates',
        value: `(${animal.location_x}, ${animal.location_y})`
    })

    return (
        <Card obj={animal}>{children}</Card>
    )

}

export default AnimalCard