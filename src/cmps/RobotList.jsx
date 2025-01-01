import { Link } from "react-router-dom";
import { RobotPreview } from "./RobotPreview";

export function RobotList({ robots, onRemoveRobot }) {

    // console.log('list render');
    return (
        <ul className="robot-list">
            {robots.map(robot =>
                <li key={robot.id}>
                    <RobotPreview robot={robot} />
                    <section className="robot-actions">
                        <button onClick={() => onRemoveRobot(robot.id)}>X</button>
                        <Link style={{ color: 'white' }} to={`/robot/edit/${robot.id}`}>Edit</Link>
                    </section>
                </li>
            )}
        </ul>
    )
}