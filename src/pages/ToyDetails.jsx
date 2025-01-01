import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { robotService } from "../services/robot.service"
import { toyService } from "../services/toy.service"

export default function ToyDetails() {
    const user = useSelector(storeState => storeState.userModule.user)

    const [toy, setToy] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadToy()
    }, [params.toyId])

    async function loadToy() {
        const toy = await toyService.getById(params.toyId)
        setToy(toy)
    }

    console.log('render')
    if (!toy) return <div>Loading...</div>
    const inStock = (toy.inStock === true ? 'In Stock' : 'Out of stock!');
    return (
        <section className="toy-details">
            <h3>Type : {toy.name}</h3>
            <h4>Price: {toy.price} ILS</h4>
            <ul>
                {toy.labels.map(label =>
                    <li key={label}>{label}</li>
                )}
            </ul>
            <strong>{inStock}</strong>
            {user && <strong>test</strong>}
            <Link to="/toys">Back</Link>
        </section>
    )
}