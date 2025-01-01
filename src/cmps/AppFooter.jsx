import { useState } from "react"
import { ColorInput } from "./dynamic-inputs/ColorInput"
import { FontsizeInput } from "./dynamic-inputs/FontSizeInput"
import { useSelector } from "react-redux"

export function AppFooter() {

    const numOfRobots = useSelector(storeState => storeState.robotModule.robots?.length)
    const [cmpType, setCmpType] = useState('color')
    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: '#101010',
        fontSize: '16px'
    })



    function onSetFooterStyle(footerStyle) {
        setFooterStyle(prevStyle => ({ ...prevStyle, ...footerStyle }))
    }


    return (
        <footer style={footerStyle} className="app-footer">
            <section className="container">
                <DynamicInput {...footerStyle} onSetFooterStyle={onSetFooterStyle} cmpType={cmpType} name="Popo" />
                <section>
                    Number of robots: {numOfRobots || 0}
                </section>
                <select onChange={(ev) => setCmpType(ev.target.value)}>
                    <option value="color">Color</option>
                    <option value="fontSize">Font size</option>
                </select>
            </section>
        </footer>
    )
}


function DynamicInput({ cmpType, ...restOfProps }) {
    switch (cmpType) {
        case 'color':
            return <ColorInput {...restOfProps} />
        case 'fontSize':
            return <FontsizeInput {...restOfProps} />
        default:
            return <></>;
    }
}