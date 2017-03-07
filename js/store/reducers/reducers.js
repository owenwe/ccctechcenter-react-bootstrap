import C from '../../constants'
import termsReducer from './terms'
import { combineReducers } from 'redux'

export const goal = (state = 10, action) =>
  action.type === C.SET_GOAL ? parseInt(action.payload) : state

export const messages = (state = [], action) => {
  switch (action.type) {
    case C.ADD_MESSAGE:
      return [
        ...state,
        action.payload
      ]
    case C.CLEAR_MESSAGE:
      return state.filter((message, i) => i !== action.payload)
    default:
      return state
  }
}

// TODO: C.FETCH_MAJORS, C.FETCH_COLLEGES, C.FETCH_DISTRICTS, C.FETCH_SUPPLEMENTALS

export default combineReducers({
  terms: termsReducer,
  goal,
  messages
})
