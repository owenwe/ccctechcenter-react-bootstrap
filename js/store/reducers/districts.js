import C from '../../constants'
import { combineReducers } from 'redux'

export const datatable = (state = {}, action) => {
  switch (action.type) {
    case C.DT_COLUMN_RESIZE:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.payload.column]: {
            ...state.columns[action.payload.column],
            width: action.payload.width
          }
        }
      }
    default:
      return state
  }
}

export const fetching = (state = false, action) => {
  switch (action.type) {
    case C.FETCH_DISTRICTS:
      return true
    case C.CANCEL_FETCHING:
      return false
    case C.CHANGE_SUGGESTIONS:
      return false
    case C.UPDATE_DISTRICTS_POPULATION:
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

export const search = (state = {}, action) => {
  switch (action.type) {
    case C.CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        content: [],
        sort: [
          {
            "property": "id",
            "direction": "ASC",
            "ascending": true,
            "descending": false
          }
        ],
        sortIndexes: []
      }
    case C.UPDATE_DISTRICTS_POPULATION:
      let sortIndexes = []
      action.payload.forEach((c,i) => {
        sortIndexes.push(i)
      })
      return {
        ...state,
        content: action.payload,
        sortIndexes: sortIndexes
      }
    case C.DISTRICTS_SORT_CHANGE:
      return {
        ...state,
        sort: action.payload.newSort,
        sortIndexes: action.payload.newIndexes
      }
    default:
      return state
  }
}

export default combineReducers({
  config: combineReducers({
    datatable
  }),
  search,
  fetching,
  suggestions
})
