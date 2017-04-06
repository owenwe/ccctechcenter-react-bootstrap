import React from 'react'
import { render } from 'react-dom'
import routes from './routes'
import storeFactory from './store'
import { Provider } from 'react-redux'
import defaultState from './initialState'
import { initDistricts } from './actions/districts'
import { initColleges } from './actions/colleges'
import { setTimezone, initCountries, initLanguages } from './actions/application'

const initialState = (window.localStorage['redux-store'])
  ? JSON.parse(window.localStorage['redux-store'])
  : defaultState

const saveState = () => {
  window.localStorage['redux-store'] = JSON.stringify(store.getState())
}

const store = storeFactory(initialState)
store.subscribe(saveState)

if (!initialState.timezone) {
  store.dispatch(setTimezone(moment.tz.guess()))
}
if (initialState.cccapply.districts.search.content.length === 0) {
  store.dispatch(initDistricts())
}
if (initialState.cccapply.colleges.search.content.length === 0) {
  store.dispatch(initColleges())
}
if (initialState.countries.length === 0) {
  store.dispatch(initCountries())
}
if (initialState.languages.length === 0) {
  store.dispatch(initLanguages())
}

window.React = React
window.store = store

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
