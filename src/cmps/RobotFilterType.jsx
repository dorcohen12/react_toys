import { useEffect, useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate"

export function RobotFilterType({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffectUpdate(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])


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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { type } = filterByToEdit

    return (
        <section className="robot-filter">
            <label htmlFor="type">Choose your type</label>
            <select onChange={handleChange} value={type} id="type" name="type" >
                <option value="">Choose a type</option>
                <option value="Cooking">Cooking</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Pleasure">Pleasure</option>
                <option value="Office">Office</option>
            </select>
        </section>
    )
}   