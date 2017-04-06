import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Layout } from './components/Layout'
import Landing from './components/ui/Landing'
import Terms from './components/containers/Terms'
import Colleges from './components/containers/Colleges'
import Districts from './components/containers/Districts'
import Actions from './components/containers/Actions'

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Landing} />
      <Route path='terms' component={Terms} />
      <Route path='colleges' component={Colleges} />
      <Route path='districts' component={Districts} />
      <Route path='actions' component={Actions} />
    </Route>
  </Router>
)

export default routes
