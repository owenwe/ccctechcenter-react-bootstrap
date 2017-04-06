import C from '../../constants'
import { combineReducers } from 'redux'

export const term = (state = null, action) =>
  action.type === C.ADD_TERM ? action.payload : state

export const college = (state = null, action) =>
  action.type === C.TERMS_SET_COLLEGE ? action.payload : state

/**
 *
 * @param state object representing terms.config.datatable
 * @param action type = (DATATABLE_COLUMN_RESIZE, ), payload = {}
 * @returns {{}}
 */
export const datatable = (state = {}, action) => {
  switch (action.type) {
    case C.DT_COLUMN_RESIZE:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.column]: {
            ...state.columns[action.payload.column],
            width: action.payload.width}
        }
      }
    default:
      return state
  }
}

export const fetching = (state = false, action) => {
  switch (action.type) {
    case C.FETCH_TERMS:
      return true
    case C.CANCEL_FETCHING:
      return false
    case C.CHANGE_SUGGESTIONS:
      return false
    case C.UPDATE_TERMS_SEARCH_RESULTS:
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

// TODO: C.SEARCH_TERMS, C.UPDATE_TERM
export const search = (state = {}, action) => {
  switch (action.type) {
    case C.ADD_TERM:
      const exists = state['content'].some(term => term.id === action.payload.id)
      return (exists)
        ? state
        : {
          ...state,
          'content': [
            ...state['content'],
            term(null, action)
          ]
        }
    case C.ARCHIVE_TERM:
      return state.content.filter(term => term.id !== action.payload)
    case C.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        content: [],
        first: true,
        last: true,
        number: 0,
        numberOfElements: 0,
        totalElements: 0,
        totalPages: 0
      }
    case C.UPDATE_TERMS_SEARCH_RESULTS:
      console.log(action)
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  config: combineReducers({
    datatable
  }),
  college,
  search,
  fetching,
  suggestions
})
