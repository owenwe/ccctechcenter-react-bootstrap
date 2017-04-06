import appReducer from './reducers/reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
  console.log(`dispatching action => ${action.type}`)
  let result = next(action)
  return result
}

export default (initialState = {}) => {
  return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}
