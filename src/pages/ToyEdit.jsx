import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { saveRobot } from "../store/robot/robot.actions";
import { toyService } from "../services/toy.service";

export default function ToyEdit() {

    const [toy, setToy] = useState(toyService.createToy())

    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) {
            loadToy()
        }
    }, [])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setToy((toy) => ({ ...toy, [field]: value }))
    }

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (error) {
            console.log('error:', error)
        }
    }


    async function onSubmitRobot(ev) {
        ev.preventDefault()
        try {
            await saveRobot(robot)
            navigate('/toys')
        } catch (err) {
            console.log('err:', err)
        }

    }
    console.log(toy)

    const { name, type, batteryStatus } = toy

    return (
        <section className="toy-edit">
            <Link to="/toys"><button className="close-btn">X</button></Link>
            <h1>{toyId ? 'Edit' : 'Add'} Toy</h1>
            <form onSubmit={onSubmitRobot}>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={name} type="text" id="name" name="name" />

                <label htmlFor="type">Type</label>
                <select onChange={handleChange} value={type} id="type" name="type"  >
                    <option disabled value="">Choose a type</option>
                    <option value="Cooking">Cooking</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Pleasure">Pleasure</option>
                    <option value="Office">Office</option>
                </select>

                <label> Battery status {batteryStatus}
                    <input onChange={handleChange} value={batteryStatus} type="range" id="batteryStatus" name="batteryStatus" />
                </label>
                <section className="btns">
                    <button className="btn">Save</button>
                </section>
            </form>
        </section>
    )
}
