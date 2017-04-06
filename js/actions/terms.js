import C from '../constants'
import * as appActions from './application'
import fetch from 'isomorphic-fetch'

export const changeCollege = collegeId =>
  ({
    type: C.TERMS_SET_COLLEGE,
    payload: collegeId
  })

export const addTerm = (termCode, description, dateStart, dateEnd, dateOpen, dateClose) => {
  return {
    type: C.ADD_TERM,
    payload: {termCode, description, dateStart, dateEnd, dateOpen, dateClose}
  }
}

export const archiveTerm = (id) => {
  return {
    type: C.ARCHIVE_TERM,
    payload: id
  }
}

export const searchTerms = (collegeId = null, page = 0, size = 10, sort = [], callback = null) => dispatch => {
  if (!collegeId) {
    return
  }

  dispatch({type: C.FETCH_TERMS})

  /*
   * Paging/Sorting parameters (request params after the ? in the url)
   * terms_page : 0=1, 2, 3, ...
   * terms_size : number of records to return on each page
   * terms_sort : special format {property name},{asc|desc} example: ?terms_sort=termCode,desc
   *              sort direction defaults to asc, there's no easy way to add ignoreCase
   *
   * Simple Query Parameters
   * {property name | property name.sub-property name}=* : example dateOpen=2014-12-31T16:00:00-00:00&college.id=121
   * Predicate only has the properties, not the paging/sorting
   * So the example above would be converted to: term.dateOpen = 2014-12-31T16:00Z && term.college.id = 121
   * but dates do NOT work
   *
   * MultiValueMap has all request parameters
   */
  let sp = []
  sort.map((v, i, a) => {
    sp.push(`terms_sort=${v.property}${v.descending ? ',desc' : ''}`)
  })

  fetch(`http://localhost:8081/terms?${sp.length ? sp.join('&') : ''}&terms_page=${page}&terms_size=${size}&college.id=${collegeId}`)
    .then(response => response.json())
    .then(searchResults => {
      dispatch({
        type: C.UPDATE_TERMS_SEARCH_RESULTS,
        payload: searchResults
      })
      if (callback) {
        callback()
      }
    })
    .catch(error => {
      dispatch(appActions.addErrorMessage(error.message))
      dispatch({type: C.CANCEL_FETCHING})
    })
}

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
