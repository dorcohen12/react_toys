export function FontsizeInput({ name, onSetFooterStyle, fontSize }) {



    function onSetFontSize({ target }) {
        const newStyle = { fontSize: target.value + 'px' }
        onSetFooterStyle(newStyle)
    }
    return (
        <section className="color-input">
            <div className="items-container">
                <label htmlFor="">{fontSize}</label>
                <input value={parseInt(fontSize)} onChange={onSetFontSize} type="range" min={14} max={26} />
            </div>
            <h3>Hello {name}! pick a font size!</h3>
        </section>
    )

}