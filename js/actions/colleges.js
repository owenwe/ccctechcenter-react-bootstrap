import C from '../constants'
import * as appActions from './application'
import fetch from 'isomorphic-fetch'

export const initColleges = () => dispatch => {
  dispatch({type: C.FETCH_COLLEGES})

  fetch(`http://localhost:8081/colleges/json`)
    .then(response => response.json())
    .then(searchResults => {
      dispatch({
        type: C.UPDATE_COLLEGES_POPULATION,
        payload: searchResults
      })
    })
    .catch(error => {
      dispatch(appActions.addErrorMessage(error.message))
      dispatch({type: C.CANCEL_FETCHING})
    })
}

export const sortChange = (newIndexes = [], newSort = []) => {
  return {
    type: C.COLLEGES_SORT_CHANGE,
    payload: {newIndexes, newSort}
  }
}
