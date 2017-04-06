import C from '../constants'
import * as appActions from './application'
import fetch from 'isomorphic-fetch'

export const initDistricts = () => dispatch => {
  dispatch({type: C.FETCH_DISTRICTS})

  fetch(`http://localhost:8081/districts/json`)
    .then(response => response.json())
    .then(searchResults => {
      dispatch({
        type: C.UPDATE_DISTRICTS_POPULATION,
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
    type: C.DISTRICTS_SORT_CHANGE,
    payload: {newIndexes, newSort}
  }
}
