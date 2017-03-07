import React from 'react'
require('bs4/button.js')

const Landing = () => (
  <div className='jumbotron'>
    <h1 className='display-3'>Hello, world!</h1>
    <p className='lead'>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <hr className='my-4' />
    <p className='lead'>
      <a className='btn btn-primary btn-lg' href='http://getbootstrap.com/components' role='button'>Get More Bootstrap Components</a>
    </p>
  </div>
)

export default Landing
