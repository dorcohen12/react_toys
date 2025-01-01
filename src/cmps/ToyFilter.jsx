import { useEffect, useState } from "react"
import { useFormRegister } from "../customHooks/useFormRegister"
import { labels as originalLabels } from "../services/toy.service";

export function ToyFilter({ filterBy, onSetFilterBy }) {
    console.log('Filter Render!');
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
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
    const { name, inStock, labels } = filterByToEdit
    
    return (
        <form className="toy-filter">
            <h1>Filter</h1>
            <section>
                <label htmlFor="name">Name</label>
                <input value={name} name="name" id="name" onChange={handleChange} />
            </section>
            <section>
                <label htmlFor="inStock">In Stock</label>
                <select name="inStock" id="inStock=" onChange={handleChange}>
                    <option value='all' checked>All</option>
                    <option value={1}>In Stock</option>
                    <option value={0}>Out of Stock</option>
                </select>
            </section>
            {/* <section>
                <label htmlFor="labels">Labels</label>
                <select name="labels" id="labels" onChange={handleChange} multiple>
                    {originalLabels.map(label =>
                        <option value={label}>{label}</option>
                    )}
                </select>
            </section> */}
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}   