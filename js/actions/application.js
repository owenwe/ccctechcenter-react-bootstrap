import C from '../constants'

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
