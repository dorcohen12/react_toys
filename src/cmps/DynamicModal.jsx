import { useDispatch, useSelector } from "react-redux"
import { SET_MODAL_DATA } from "../store/app/app.reducer.js"

export function DynamicModal() {

    const modalData = useSelector(storeState => storeState.appModule.modalData)
    const dispatch = useDispatch()

    function onCloseModal() {
        dispatch({ type: SET_MODAL_DATA, modalData: null })
    }

    if (!modalData) return <></>

    const Cmp = modalData.cmp || <></>
    const props = modalData.props || null
    const style = modalData.style || null
    return (
        <>
            <section onClick={onCloseModal} className='modal-backdrop'></section>
            <section style={{ ...style }} className='modal-content'>
                <Cmp {...props} />
                <button className='btn close-btn' onClick={onCloseModal}>X</button>
            </section>
        </>
    )
}

