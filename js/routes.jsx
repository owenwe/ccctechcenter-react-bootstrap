import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Layout } from './components/Layout'
import Landing from './components/ui/Landing'
import Terms from './components/containers/Terms'
import Actions from './components/containers/Actions'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Landing} />
      <Route path='terms' component={Terms} />
      <Route path='actions' component={Actions} />
    </Route>
  </Router>
)

export default routes
