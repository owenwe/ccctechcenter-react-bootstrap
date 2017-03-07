import C from '../js/constants'
import appReducer from '../js/store/reducers/reducers'
import initialState from '../js/initialState.json'

let state = initialState

console.log(`initial state: ${JSON.stringify(state)}`)

state = appReducer(state, {
  type: C.SET_GOAL,
  payload: 2
})

state = appReducer(state, {
  type: C.ADD_TERM,
  payload: {
    archived: false,
    dateClose: 1420139222389,
    dateEnd: 1420070400000,
    dateOpen: 1301616000000,
    dateStart: 1312156800000,
    description: 'Fall 2011 - Southwestern College',
    id: 239,
    termCode: '09111'
  }
})

state = appReducer(state, {
  type: C.CHANGE_SUGGESTIONS,
  payload: ['Foo', 'Bar']
})

console.log(`next state: ${JSON.stringify(state)}`)
