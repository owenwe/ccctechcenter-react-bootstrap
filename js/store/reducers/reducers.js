import C from '../../constants'
import districtReducer from './districts'
import collegesReducer from './colleges'
import termsReducer from './terms'
import { combineReducers } from 'redux'

export const timezone = (state = '', action) => {
  switch (action.type) {
    case C.SET_TIMEZONE:
      return action.payload ? action.payload : moment.tz.guess()
    default:
      return state
  }
}

export const countries = (state = [], action) =>
  action.type === C.INIT_COUNTRIES ? action.payload : state

export const languages = (state = [], action) =>
  action.type === C.INIT_LANGUAGES ? action.payload : state

export const states = (state = [], action) =>
  action.type === C.STATES ? action.payload : state

export const awardTypes = (state = [], action) => {
  switch (action.type) {
    case C.GET_AWARD_TYPE_BY_VALUE:
      let a = _.find(state, { value: action.payload })
      return a ? a : null
    case C.GET_AWARD_TYPES_BY_VALUES:
      let aTypes = _.filter(state, (at) => {
        return _.indexOf(action.payload, at.value) > -1
      })
      return aTypes
    default:
      return state
  }
}

export const educationalGoals = (state = [], action) => {
  switch (action.type) {
    case C.GET_EDU_GOAL_BY_VALUE:
      let e = _.find(state, { value: action.payload })
      return e ? e : null
    case C.GET_EDU_GOALS_BY_VALUES:
      let edGoals = _.filter(state, (eg) => {
        return _.indexOf(action.payload, eg.value) > -1
      })
      return edGoals
    default:
      return state
  }
}

export const collegeId = (state = '', action) =>
  action.type === C.SET_COLLEGE ? action.payload : state

export const user = (state = {}, action) => {
  switch(action.type) {
    case C.INIT_USER:
      return {role:'user'}
    case C.CHANGE_USER_ROLE:
      let newRole
      switch (action.payload) {
        case 'district':
        case 'admin':
          newRole = action.payload
              break;
        default:
          newRole = 'user'
      }
      return {
        role: newRole
      }
    default:
      return {role:'user'}
  }
}

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
  timezone,
  languages,
  countries,
  states,
  awardTypes,
  educationalGoals,
  user,
  collegeId,
  messages,
  cccapply: combineReducers({
    districts: districtReducer,
    colleges: collegesReducer,
    terms: termsReducer
  })
})
