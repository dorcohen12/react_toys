
import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { robotReducer } from './robot/robot.reducer'
import { userReducer } from './user/user.reducer'
import { appReducer } from './app/app.reducer'
import { toysReducer } from './toys/toys.reducer'

const rootReducer = combineReducers({
    robotModule: robotReducer,
    toyModule: toysReducer,
    userModule: userReducer,
    appModule: appReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

//* For debugging
window.gStore = store