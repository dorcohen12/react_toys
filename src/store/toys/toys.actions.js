import { showErrorMsg } from "../../services/event-bus.service";
import { robotService } from "../../services/robot.service";
import { toyService } from "../../services/toy.service";
import { store } from "../store";
import { ADD_ROBOT, EDIT_ROBOT, INCREASE_COUNTER, REMOTE_TOY, SET_FILTER, SET_IS_LOADING, SET_TOYS, UNDO_CHANGES } from "./toys.reducer";


export async function loadToys() {

    try {
        const filterBy = store.getState().robotModule.filterBy
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Having issues with loading robots:', err)
        showErrorMsg('Having issues with loading robots:')
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOTE_TOY, toyId })
    } catch (err) {
        console.log('Having issues removing toy:', err)
        throw err
    }
}

export async function removeRobotOptimistic(robotId) {
    try {
        store.dispatch({ type: REMOVE_ROBOT, robotId })
        await robotService.remove(robotId)
    } catch (err) {
        console.log('Having issues removing robot:', err)
        store.dispatch({ type: UNDO_CHANGES })
        throw err
    }
}

export async function saveRobot(robotToSave) {
    try {
        const type = robotToSave.id ? EDIT_ROBOT : ADD_ROBOT
        const robot = await robotService.save(robotToSave)
        store.dispatch({ type, robot })
    } catch (err) {
        console.log('Having issues saving robot:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

export async function increaseCounter(diff = 5) {
    store.dispatch({ type: INCREASE_COUNTER, diff })
}