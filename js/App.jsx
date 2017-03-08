import React from 'react'
import { render } from 'react-dom'
import routes from './routes'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { searchByTermCode } from './actions/terms'
import defaultState from './initialState'

const initialState = (window.localStorage['redux-store'])
  ? JSON.parse(window.localStorage['redux-store'])
  : defaultState

const saveState = () => {
  window.localStorage['redux-store'] = JSON.stringify(store.getState())
}

const store = storeFactory(initialState)
store.subscribe(saveState)

store.dispatch(
  searchByTermCode('sp2016')
)

window.React = React
window.store = store

render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
