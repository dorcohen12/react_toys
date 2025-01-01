
export const SET_ROBOTS = 'SET_ROBOTS'
export const REMOVE_ROBOT = 'REMOVE_ROBOT'
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
    lastRobots: []
}

export function robotReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_ROBOTS:
            return {
                ...state,
                robots: cmd.robots
            }
        case REMOVE_ROBOT:
            return {
                ...state,
                robots: state.robots.filter(robot => robot.id !== cmd.robotId),
                lastRobots: [...state.robots]
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