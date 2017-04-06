import React from 'react'

class Pager extends React.Component {
  constructor(props) {
    super(props)
    this.pageLinkClick = this.pageLinkClick.bind(this)
  }

  pageLinkClick(e) {
    e.preventDefault()
    const page = parseInt(e.target.getAttribute('data-page'))

    if (this.props.number === page) {
      return
    }

    if (this.props.pageChange) {
      this.props.pageChange(page)
    }
  }

  render() {
    let _pages = [],
      _page = this.props.number,
      _p1b = _page+1,
      _sets = Math.ceil(this.props.totalPages / this.props.numberOfSteps),
      _set = 1 + Math.floor(_page / this.props.numberOfSteps),
      _step = this.props.totalElements - (this.props.numberOfSteps * _p1b),
      _pos = _page % this.props.numberOfSteps,
      _max = _p1b % this.props.numberOfSteps > 0 ? this.props.totalPages : (this.props.totalPages - _step),
      _remain = this.props.totalPages - _p1b,
      _limit = this.props.totalPages <= this.props.numberOfSteps
        ? this.props.totalPages
        : (_remain + _pos) >= this.props.numberOfSteps ? this.props.numberOfSteps : 1 + _remain + _pos,
      _pageNumberLink = _p1b

    for(let i=0; i<_limit; i++) {
      _pageNumberLink = (_page + (i-_pos))
      let _displayNumber = (_pageNumberLink + 1), _isActive = (i === _pos)
      _pages.push(
          <li key={`dtp_${i}`}
              className={'page-item ' + (_isActive ? 'active' : '')}>
            <a className='page-link' href='#' data-page={_pageNumberLink} onClick={this.pageLinkClick}>
              {_displayNumber}
              {_isActive && <span className='sr-only'>(current)</span>}
            </a>
          </li>
      )
    }

    return _pages.length >= 1
      ? (
      <nav aria-label='datatable paging control'>
        <ul className='pagination pagination-sm'>
          { (_set !== 1) &&
            <li className='page-item'>
              <a className='page-link'
                 href='#'
                 data-page={0}
                 onClick={this.pageLinkClick}
                 aria-label='First'>«</a>
            </li>
          }
          { (_set !== 1) &&
            <li className='page-item'>
              <a className='page-link'
                 href='#'
                 data-page={_page - (_pos+1)}
                 onClick={this.pageLinkClick}
                 aria-label='Previous'>‹</a>
            </li>
          }
          {_pages}
          { (_set < _sets) &&
            <li className='page-item'>
              <a className='page-link'
                 href='#'
                 aria-label='Next'
                 data-page={_pageNumberLink + 1}
                 onClick={this.pageLinkClick}>›</a>
            </li>
          }
          { (_set < _sets) &&
            <li className='page-item'>
              <a className='page-link'
                 href='#'
                 aria-label='Last'
                 data-page={this.props.totalPages - 1}
                 onClick={this.pageLinkClick}>»</a>
            </li>
          }
        </ul>
      </nav>
      )
      : null
  }
}

export default Pager
