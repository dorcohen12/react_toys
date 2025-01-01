import { useContext, useRef } from "react";
import { utilService } from "../services/util.service";
import { ThemeContext } from "../contexts/ThemeContext";

export function Home() {

    const h1Ref = useRef()
    const imgRef = useRef()
    const { toggleTheme } = useContext(ThemeContext)

    async function onActivate() {
        await utilService.animateCSS(h1Ref.current, 'jello')
        utilService.animateCSS(imgRef.current, 'rotateOut', { isRemoveClass: false })
    }

    

    return (
        <section className="home">
            <section >
                <button onClick={onActivate}>Activate</button>
                <button onClick={toggleTheme}>Toggle Theme</button>
            </section>
            <h1 ref={h1Ref} >Welcome to our Robots App</h1>
            <img ref={imgRef} src='./vite.svg' />

        </section>
    )
}
