import C from '../constants'
import * as appActions from './application'
import fetch from 'isomorphic-fetch'

export const searchByTermCode = value => dispatch => {
  dispatch({
    type: C.FETCH_TERMS
  })

  fetch(`http://localhost:8081/terms/search/${value.trim()}`)
    .then(response => response.json())
    .then(suggestions => {
      dispatch({
        type: C.CHANGE_SUGGESTIONS,
        payload: suggestions
      })
    })
    .catch(error => {
      dispatch(appActions.addErrorMessage(error.message))
      dispatch({type: C.CANCEL_FETCHING})
    })
}
