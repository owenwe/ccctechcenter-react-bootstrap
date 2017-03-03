const React = require('react')
const ReactDOM = require('react-dom')
const {hashHistory, IndexRoute, Router, Route} = require('react-router')
const Layout = require('./Layout')
const Landing = require('./Landing')
// const { store } = require('./Store')
import '../stylesheets/index.scss'

const App = React.createClass({
  render () {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout}>
          <IndexRoute component={Landing} />
        </Route>
      </Router>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))
