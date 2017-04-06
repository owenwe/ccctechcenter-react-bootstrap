import C from '../constants'
import Countries from 'country-list'
import lang from 'iso-639-1'

export const setTimezone = tz =>
  ({
    type: C.SET_TIMEZONE,
    payload: tz
  })

export const initCountries = () =>
  ({
    type: C.INIT_COUNTRIES,
    payload: Countries().getData()
  })

export const initLanguages = () =>
  ({
    type: C.INIT_LANGUAGES,
    payload: lang.getLanguages(lang.getAllCodes())
  })

export const changeUserRole = newRole =>
  ({
    type: C.CHANGE_USER_ROLE,
    payload: newRole
  })

export const changeCollegeId = collegeId =>
  ({
    type: C.SET_COLLEGE,
    payload: collegeId
  })

export const sortChange = (data, indexes, columnKey, sortDir) => {
  let sortIndexes = indexes.slice()
  sortIndexes.sort((ia, ib) => {
    // TODO might need a case for comparing objects
    let va = data[ia][columnKey], vb = data[ib][columnKey], sortVal = 0

    if (_.isPlainObject(va)) {
      // first try the "name" property, then "id"
      if (_.has(va, 'name')) {
        va = data[ia][columnKey].name
        vb = data[ib][columnKey].name
      } else if (_.has(va, 'id')) {
        va = data[ia][columnKey].id
        vb = data[ib][columnKey].id
      }
    }

    if (va > vb) {
      sortVal = 1
    }
    if (va < vb) {
      sortVal = -1
    }
    if (sortVal !== 0 && sortDir === C.SORT_TYPE_ASC) {
      sortVal = sortVal*-1
    }
    return sortVal
  })
  return sortIndexes
}

export const updateColumnWidth = (newColumnWidth, columnKey) => {
  return {
    type: C.DT_COLUMN_RESIZE,
    payload: {width: newColumnWidth, column: columnKey}
  }
}

export const addSuccessMessage = (message) =>
  ({
    type: C.ADD_MESSAGE,
    payload: {text: message, type: 'alert-success'}
  })

export const addInfoMessage = (message) =>
  ({
    type: C.ADD_MESSAGE,
    payload: {text: message, type: 'alert-info'}
  })

export const addWarningMessage = (message) =>
  ({
    type: C.ADD_MESSAGE,
    payload: {text: message, type: 'alert-warning'}
  })

export const addErrorMessage = (message) =>
  ({
    type: C.ADD_MESSAGE,
    payload: {text: message, type: 'alert-danger'}
  })

export const addMessage = (message, messageType) =>
  ({
    type: C.ADD_MESSAGE,
    payload: {text: message, type: messageType}
  })

export const clearMessage = index =>
  ({
    type: C.CLEAR_MESSAGE,
    payload: index
  })
