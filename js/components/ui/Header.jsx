import React from 'react'
import { Link } from 'react-router'
require('bs4/dropdown.js')
require('bs4/button.js')
require('bs4/collapse.js')

const Header = React.createClass({
  render () {
    return (
      <header className='header mb-1'>
        <nav className='navbar navbar-toggleable-md navbar-inverse bg-primary'>
          <button className='navbar-toggler navbartoggler-right'
            type='button' role='button'
            data-toggle='collapse' data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <Link className='navbar-brand' to='/'>
            <img src='public/images/CCCAPPLY_Main_Logo_White.png' width='59' height='57' alt='CCC Tech Center Logo' />
              Some Branding Here</Link>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
              <li className='nav-item'>
                <Link className='nav-link'activeClassName='active' to='/actions'>Actions</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' activeClassName='active' to='/terms'>Terms</Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link disabled' to='/'>Link disabled</Link>
              </li>
              <li className='nav-item dropdown'>
                <a href='/' className='nav-link dropdown-toggle' id='navbarDropdownMenuLink'
                  data-toggle='dropdown'
                  aria-haspopup='true' aria-expanded='false'>Dropdown Link</a>
                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <a href='#' className='dropdown-item'>Menu Item 1</a>
                  <a href='#' className='dropdown-item'>Menu Item 2</a>
                  <a href='#' className='dropdown-item'>Menu Item 3</a>
                </div>
              </li>
            </ul>
            <form className='form-inline my2 my-lg-0'>
              <input className='form-control mr-sm-2' type='text' placeholder='Search' />
              <button className='btn btn-outline-info my-2 my-sm-0' type='button' role='button'>Search</button>
            </form>
          </div>
        </nav>
      </header>
    )
  }
})

export default Header
