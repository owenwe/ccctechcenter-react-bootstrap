import C from '../../../constants'
import React from 'react'
import { Cell } from 'fixed-data-table'

class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props)
    this._onSortChange = this._onSortChange.bind(this)
  }

  reverseSortDirection(sortDir) {
    return sortDir === C.SORT_TYPE_DESC ? C.SORT_TYPE_ASC : C.SORT_TYPE_DESC
  }

  _onSortChange(e) {
    e.preventDefault()
    if(this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir
          ? this.reverseSortDirection(this.props.sortDir)
          : C.SORT_TYPE_DESC)
    }
  }

  render() {
    const {sortDir, children, ...props} = this.props
    return (
      <Cell width={props.width} height={props.height} className='ccctc-datatable-header text-center'>
        <a href='#' onClick={this._onSortChange}>
          {children}
          <span className='font-weight-bold'>
            {sortDir ? (sortDir === C.SORT_TYPE_DESC ? '⋁' : '⋀') : ''}
          </span>
        </a>
      </Cell>
    )
  }
}

export default SortHeaderCell
