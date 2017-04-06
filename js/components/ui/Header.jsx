import React from 'react'
import { Link } from 'react-router'
require('bs4/dropdown.js')
require('bs4/button.js')
require('bs4/collapse.js')

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.roleChange = this.roleChange.bind(this)

    this.state = {}
  }

  roleChange(e) {
    this.props.changeRole(e.target.value)
  }

  render () {
    let roleThemeClass
    switch(this.props.user.role) {
      case 'admin':
        roleThemeClass = 'bg-danger'
            break
      case 'district':
        roleThemeClass = 'bg-warning'
            break
      default:
        roleThemeClass = 'bg-primary'
    }

    return (
      <header className='header mb-1'>
        <nav className={'navbar navbar-toggleable-md navbar-inverse ' + roleThemeClass}>
          <button className='navbar-toggler navbartoggler-right'
            type='button' role='button'
            data-toggle='collapse' data-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <Link className='navbar-brand' to='/'>
            <img src='public/images/CCCAPPLY_Main_Logo_White.png' width='59' height='57' alt='CCC Tech Center Logo' />
              Administrator</Link>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav mr-auto mt-2 mt-md-0'>
              <li className='nav-item dropdown'>
                <a href='/' className='nav-link dropdown-toggle' id='navbarDropdownMenuLink'
                   data-toggle='dropdown'
                   aria-haspopup='true' aria-expanded='false'>CCCApply</a>
                <div className='dropdown-menu' aria-labelledby='navbarDropdownMenuLink'>
                  <Link className='dropdown-item' activeClassName='active' to='/terms'>Terms</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/majors'>Majors</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/colleges'>{this.props.user.role === 'user' ? 'College' : 'Colleges'}</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/districts'>Districts</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/supplementals'>Supplemental Questions</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/rules'>Rules</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/downloads'>Reset Download</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/adminusers'>Users</Link>
                </div>
              </li>
              <li className='nav-item dropdown'>
                <a href='/' className='nav-link dropdown-toggle' id='bogNavbarDropdownMenuLink'
                   data-toggle='dropdown'
                   aria-haspopup='true' aria-expanded='false'>BOG Fee Waiver</a>
                <div className='dropdown-menu' aria-labelledby='bogNavbarDropdownMenuLink'>
                  <Link className='dropdown-item' activeClassName='active' to='/bogfw/rules'>Rules</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/bogfw/downloads'>Reset Download</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/bogfw/adminusers'>Users</Link>
                </div>
              </li>
              <li className='nav-item dropdown'>
                <a href='/' className='nav-link dropdown-toggle' id='intlNavbarDropdownMenuLink'
                   data-toggle='dropdown'
                   aria-haspopup='true' aria-expanded='false'>International</a>
                <div className='dropdown-menu' aria-labelledby='intlNavbarDropdownMenuLink'>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/terms'>Terms</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/majors'>Majors</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/english'>English Proficiency</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/supplementals'>Supplemental Questions</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/rules'>Rules</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/downloads'>Reset Download</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/intl/adminusers'>Users</Link>
                </div>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' activeClassName='active' to='/actions'>Actions</Link>
              </li>
            </ul>
            <ul className='navbar-nav justify-content-end'>
              <li className='nav-item dropdown'>
                <a href='/'
                   className='nav-link dropdown-toggle'
                   id='configNavbarDropdownMenuLink'
                   data-toggle='dropdown'
                   aria-haspopup='true' aria-expanded='false'>≡</a>
                <div className='dropdown-menu dropdown-menu-right' aria-labelledby='configNavbarDropdownMenuLink'>
                  <Link className='dropdown-item' activeClassName='active' to='/profile'>Profile</Link>
                  <Link className='dropdown-item' activeClassName='active' to='/config'>Config</Link>
                  <div className="dropdown-divider"></div>
                  <div className='ml-4'>
                    <div className='form-check'>
                      <label className='form-check-label'>
                        <input className='form-check-input' type='radio' name='user_role' onChange={this.roleChange} checked={this.props.user.role === 'user'} value='user' /> User
                      </label>
                    </div>
                    <div className='form-check'>
                      <label className='form-check-label'>
                        <input className='form-check-input' type='radio' name='user_role' onChange={this.roleChange} checked={this.props.user.role === 'district'} value='district' /> District
                      </label>
                    </div>
                    <div className='form-check'>
                      <label className='form-check-label'>
                        <input className='form-check-input' type='radio' name='user_role' onChange={this.roleChange} checked={this.props.user.role === 'admin'} value='admin' /> Admin
                      </label>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
