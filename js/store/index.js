import appReducer from './reducers/reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
  let result

  console.groupCollapsed(`dispatching action => ${action.type}`)
  console.log('terms', store.getState().terms.suggestions.length)
  result = next(action)

  let { terms, goal, messages } = store.getState()
  console.log(JSON.stringify(store.getState()))
  console.log(`
    
    term fetching: ${terms.fetching}
    term suggestions: ${terms.suggestions.length}
    goal: ${goal}
    messages: ${messages.length}

`)

  console.groupEnd()

  return result
}

export default (initialState = {}) => {
  return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}
