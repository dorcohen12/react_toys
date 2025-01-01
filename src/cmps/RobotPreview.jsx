import { Link } from "react-router-dom";



export function RobotPreview({ robot }) {

    return (
        <article className="robot-preview">
            <Link to={`/robot/${robot.id}`}>
                <img src={`https://robohash.org/${robot.type}`} alt="" />
                <h2>{robot.model}</h2>
                <h4>Type: {robot.type}</h4>
                <h4>Battery: {robot.batteryStatus}</h4>
            </Link>
        </article>
    )
}