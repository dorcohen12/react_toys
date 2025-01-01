
export const SET_TOYS = 'SET_TOYS'
export const REMOTE_TOY = 'REMOTE_TOY'
export const ADD_ROBOT = 'ADD_ROBOT'
export const EDIT_ROBOT = 'EDIT_ROBOT'
export const SET_FILTER = 'SET_FILTER'
export const UNDO_CHANGES = 'UNDO_CHANGES'
export const SET_IS_LOADING = 'SET_IS_LOADING'

export const INCREASE_COUNTER = 'INCREASE_COUNTER'

const initialState = {
    robots: null,
    filterBy: {},
    counter: 0,
    isLoading: true,
    lastToys: []
}

export function toysReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case REMOTE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lastToys: [...state.toys]
            }
        case ADD_ROBOT:
            return {
                ...state,
                robots: [...state.robots, cmd.robot]
            }
        case EDIT_ROBOT:
            return {
                ...state,
                robots: state.robots.map(robot => robot.id === cmd.robot.id ? cmd.robot : robot),
            }

        case SET_FILTER:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case UNDO_CHANGES:
            console.log('UNDO');
            return {
                ...state,
                robots: [...state.lastRobots]
            }
        case INCREASE_COUNTER:
            return {
                ...state,
                counter: state.counter + cmd.diff
            }
        case SET_IS_LOADING:

            return {
                ...state,
                isLoading: cmd.isLoading
            }
        default:
            return state
    }
}