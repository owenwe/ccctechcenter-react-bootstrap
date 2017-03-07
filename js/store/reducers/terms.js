import C from '../../constants'
import { combineReducers } from 'redux'

export const term = (state = null, action) =>
  action.type === C.ADD_TERM ? action.payload : state

export const fetching = (state = false, action) => {
  switch (action.type) {
    case C.FETCH_TERMS:
      return true
    case C.CANCEL_FETCHING:
      return false
    case C.CHANGE_SUGGESTIONS:
      return false
    default:
      return state
  }
}

export const suggestions = (state = [], action) => {
  switch (action.type) {
    case C.CLEAR_SUGGESTIONS:
      return []
    case C.CHANGE_SUGGESTIONS:
      return action.payload
    default:
      return state
  }
}

// TODO: C.UPDATE_TERM
export const terms = (state = [], action) => {
  switch (action.type) {
    case C.ADD_TERM:
      const exists = state.some(term => term.id === action.payload.id)
      return (exists) ? state : [
        ...state,
        term(null, action)
      ]
    case C.REMOVE_TERM:
      return state.filter(term => term.id !== action.payload)
    default:
      return state
  }
}

export default combineReducers({
  fetching,
  suggestions
})
