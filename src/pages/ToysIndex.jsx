import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { ToyFilter } from "../cmps/ToyFilter";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { debounce, getExistingProperties } from "../services/util.service";
import { useSelector } from "react-redux";
// import { loadRobots, removeRobot, setFilterBy } from "../store/robot/robot.actions";
import { spendBalance } from "../store/user/user.actions";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useToggle } from "../customHooks/useToggle";
import { loadToys, removeToy, setFilterBy } from "../store/toys/toys.actions";
import { ToyList } from "../cmps/ToyList";
import { toyService } from "../services/toy.service";

export default function ToysIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 400)).current
    const [popo, togglePopo] = useToggle(false)
    // const [popo, setPopo] = useState(false)

    useEffect(() => {
        setFilterBy(toyService.getFilterFromSearchParams(searchParams))
    }, [])

    useEffectUpdate(() => {
        loadToys()
        setSearchParams(getExistingProperties(filterBy))
    }, [filterBy])


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Robot removed successfully!')
        } catch (error) {
            showErrorMsg(`Having issues removing robot (${toyId})`)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    async function onSpendBalance() {
        try {
            await spendBalance(50)
        } catch (error) {
            showErrorMsg('Cannot spend balance!')
        }
    }

    // function onTogglePopo() {
    //     setPopo(popo => !popo)
    // }

    function getBigNum() {
        let sum = 0
        for (let i = 0; i < 1E9; i++) {
            sum += i
        }
        return sum * toys?.length || 1
    }
    
    if (!toys) return <div>Loading...</div>

    const { name, inStock, type, labels } = filterBy
    return (
        <section className="toy-index">
            <h1>Welcome! this is our toys</h1>
            <ToyFilter onSetFilterBy={onSetFilterByDebounce} filterBy={{ name, inStock, labels }} />
            {/* <section style={{ marginBlock: '10px', display: 'flex', gap: '10px' }}>
                <button onClick={onSpendBalance}>Spend Balance</button>
                <button onClick={togglePopo}>{popo ? 'Popo!' : 'Not Popo...'}</button>
            </section> */}
            <Link to='/toys/edit'>Add Toy</Link>
            <ToyList toys={toys} onRemoveToy={onRemoveToy} />
            <Outlet />
        </section>
    )
}
