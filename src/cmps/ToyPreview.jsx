import { Link } from "react-router-dom";



export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h2>{toy.name}</h2>
            <h4>Price: {toy.price} ILS</h4>
            {/* <ul>
                {toy.labels.map(label =>
                    <li>{label}</li>
                )}
            </ul> */}
            <Link to={`/toy/${toy._id}`}>
                <button className="btn-primary">View Details</button>
            </Link>
        </article>
    )
}