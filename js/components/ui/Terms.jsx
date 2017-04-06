import C from '../../constants'
import React from 'react'
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table'
import SortHeaderCell from './datatable/SortHeaderCell'
import CheckboxCell from './datatable/CheckboxCell'
import Pager from './datatable/Pager'
import TermForm from './TermForm'
import '../../../stylesheets/DataTables.scss'

class Terms extends React.Component {
  constructor(props) {
    super(props)

    this.roleChange = this.roleChange.bind(this)
    this.updateSearchPaging = this.updateSearchPaging.bind(this)
    this.changeCollege = this.changeCollege.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.changeDatatableSize = this.changeDatatableSize.bind(this)
    this.saveTerm = this.saveTerm.bind(this)
    this.addTermClick = this.addTermClick.bind(this)
    this.editTermClick = this.editTermClick.bind(this)
    this.cancelSaveTerm = this.cancelSaveTerm.bind(this)
    this.importTermsClick = this.importTermsClick.bind(this)
    this.exportTermsClick = this.exportTermsClick.bind(this)
    this.archiveTermsClick = this.archiveTermsClick.bind(this)
    this.rowSelectChange = this.rowSelectChange.bind(this)
    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this)
    this.onSortChange = this.onSortChange.bind(this)

    this.state = {
      collegeId: props.collegeId ? props.collegeId : 'ZZ3',
      first: props.search.first,
      last: props.search.last,
      page: props.search.number,
      numberOfElements: props.search.numberOfElements,
      size: props.search.size,
      totalElements: props.search.totalElements,
      totalPages: props.search.totalPages,
      sort: props.search.sort,
      columnSorts: _.keyBy(props.search.sort, 'property'),
      datatableConfig: props.datatable,
      selectedRows: [],
      actionDisabled: true,
      showArchived: false,

      datatableVisible: true,
      term: {
        id:'',
        termCode:'',
        description:'',
        college: '',
        collegeId: '',
        created: '',
        createBy: '',
        dateClose: '',
        dateEnd: '',
        dateOpen: '',
        dateStart: '',
        lastModified: '',
        updatedBy: ''
      },
      termViewerVisible: false,
      termViewerReadonly: false
    }
  }

  componentWillMount() {
    this.props.setCollege(this.state.collegeId)
    this.props.searchTerms(
      this.state.collegeId,
      this.props.search.number,
      this.props.search.size,
      this.props.search.sort,
      this.updateSearchPaging
    )
  }

  roleChange(e) {
    this.props.changeRole(e.target.value)
  }

  updateSearchPaging() {
    this.setState({
      collegeId: this.props.collegeId,
      first: this.props.search.first,
      last: this.props.search.last,
      page: this.props.search.number,
      numberOfElements: this.props.search.numberOfElements,
      size: this.props.search.size,
      totalElements: this.props.search.totalElements,
      totalPages: this.props.search.totalPages,
      sort: this.props.search.sort,
      columnSorts: _.keyBy(this.props.search.sort, 'property')
    })
  }

  changeCollege(e) {
    const newCollegeId = e.target.value

    if(this.state.selectedRows.length) {
      this.state.selectedRows.forEach((e) => {
        e.cell.clear()
      })
    }

    this.props.setCollege(newCollegeId)
    this.props.searchTerms(
      newCollegeId,
      0,
      this.state.size,
      this.state.sort,
      this.updateSearchPaging
    )
  }

  changeDatatableSize(e) {
    const newSize = parseInt(e.target.value)

    this.props.searchTerms(
      this.state.collegeId,
      0,
      newSize,
      this.state.sort,
      this.updateSearchPaging)
  }

  saveTerm(term) {
    console.log(term)
  }
  addTermClick(e) {
    this.setState({
      datatableVisible: false,
      termViewerVisible: true
    })
  }
  editTermClick(e) {
    let i = e.target.getAttribute('data-rowIndex')
    this.setState({
      term: {...this.props.search.content[i]},
      datatableVisible: false,
      termViewerVisible: true
    })
  }
  cancelSaveTerm() {
    this.setState({
      term: {id:'', termCode:'', description:''},
      datatableVisible: true,
      termViewerVisible: false
    })
  }

  importTermsClick(e) {
    this.props.importTerms()
  }

  exportTermsClick(e) {
    this.props.exportTerms()
  }

  archiveTermsClick(e) {
    this.props.archiveTerms()
  }

  pageChange(page) {
    this.props.searchTerms(
      this.state.collegeId,
      page,
      this.state.size,
      this.state.sort,
      this.updateSearchPaging)
  }

  rowSelectChange(checkCell, columnKey, checked, value) {
    if(checked) {
      this.setState({
        selectedRows:[
          ...this.state.selectedRows,
          {columnKey: columnKey, rowIndex: value, cell: checkCell}]})
    } else {
      this.setState({
        selectedRows: _.reject(
          this.state.selectedRows,
          {columnKey: columnKey, rowIndex: value})})
    }
    this.setState((prevState, props) => ({
      actionDisabled: (prevState.selectedRows.length === 0)
    }))
  }

  onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.props.updateColumnWidth(newColumnWidth, columnKey)
  }

  onSortChange(columnKey, sortDir) {
    let newSort = {
      property: columnKey,
      ascending: sortDir === C.SORT_TYPE_ASC,
      descending: sortDir === C.SORT_TYPE_DESC,
      direction: sortDir,
      ignoreCase: false,
      nullHandling: 'NATIVE'
    }

    this.props.searchTerms(
      this.state.collegeId,
      this.state.page,
      this.state.size,
      [newSort],
      this.updateSearchPaging)
  }

  render() {
    let colleges = [],
      dt = null,
      showTable = this.props.search.content.length && this.state.datatableVisible,
      isUserRole = this.props.user.role === 'user',
      isDistrictRole = this.props.user.role === 'district',
      isAdminRole = this.props.user.role === 'admin'

    if (this.props.colleges.length) {
      colleges = this.props.colleges.map(c => {
        return <option key={`mis_${c.id}`} value={c.id}>{c.name}</option>
      })
    }

    if (showTable) {
      dt = <Table
        {...this.props.datatable.table}
        rowsCount={this.props.search.numberOfElements}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        rowClassNameGetter={(index) => this.props.datatable.table.rowClassName}>
        <ColumnGroup
          fixed={true}
          header={
            <Cell height={this.props.datatable.table.headerHeight} className='ccctc-datatable-header'>
              <div className='row align-items-start'>
                <div className='col-9'>
                  <div className='btn-toolbar' role='toolbar' aria-label='Terms Table Toolbar'>
                    { (isAdminRole || isDistrictRole) &&
                      <div className='btn-group btn-group-sm mr-3' role='group' aria-label='College Selection'>
                      <select
                        value={this.state.collegeId}
                        className='form-control form-control-sm'
                        onChange={this.changeCollege}>
                        <option value=''>Select College...</option>
                        {colleges}
                      </select>
                    </div>}
                    <div className='btn-group btn-group-sm mr-2' role='group' aria-label='Terms Results Per Page'>
                      <label className='mr-2 my-auto'>Size:</label>
                      <select
                        value={this.state.size}
                        className='form-control form-control-sm'
                        onChange={this.changeDatatableSize}>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>
                    <div className='form-check my-auto mr-2'>
                      <label className='form-check-label'>
                        <input className='form-check-input mr-1' type='checkbox' value={this.state.showArchived} />
                        View Archived
                      </label>
                    </div>
                    <div className='btn-group btn-group-sm mr-1' role='group' aria-label='Add or Import Terms'>
                      <button type='button' className='btn btn-primary' onClick={this.addTermClick}>Add</button>
                      <button type='button' className='btn btn-info' onClick={this.importTermsClick}>Import</button>
                      <button
                        type='button'
                        className='btn btn-warning'
                        disabled={this.state.actionDisabled}
                        onClick={this.exportTermsClick}>Export
                      </button>
                      <button
                        type='button'
                        className='btn btn-danger'
                        disabled={this.state.actionDisabled}
                        onClick={this.archiveTermsClick}>Archive
                      </button>
                    </div>
                  </div>
                </div>
                <div className='col-3'>
                  <Pager
                    numberOfSteps={3}
                    first={this.state.first}
                    last={this.state.last}
                    number={this.state.page}
                    numberOfElements={this.state.numberOfElements}
                    size={this.state.size}
                    totalElements={this.state.totalElements}
                    totalPages={this.state.totalPages}
                    pageChange={this.pageChange}/>
                </div>
              </div>
            </Cell>
          }>
          <Column
            header=''
            cell={({rowIndex, width, height}) => (
              <CheckboxCell
                width={width}
                height={height}
                rowSelectChange={this.rowSelectChange}
                columnKey='id' rowIndex={rowIndex}/>
            )}
            {...this.props.datatable.columns.id} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.state.columnSorts.termCode
                  ? this.state.columnSorts.termCode.direction
                  : null}
                {...this.props.datatable.columns.termCode}>
                Term Code
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                <a href='#' data-rowIndex={rowIndex} onClick={this.editTermClick}>
                  {this.props.search.content[rowIndex].termCode}
                </a>
              </Cell>)}
            {...this.props.datatable.columns.termCode} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.state.columnSorts.description
                  ? this.state.columnSorts.description.direction
                  : null}
                {...this.props.datatable.columns.description}>
                Description
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height} className='text-left'>
                {this.props.search.content[rowIndex].description}</Cell>
            )}
            {...this.props.datatable.columns.description} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.state.columnSorts.dateStart
                  ? this.state.columnSorts.dateStart.direction
                  : null}
                {...this.props.datatable.columns.dateStart}>
                Date Start
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {moment.tz(this.props.search.content[rowIndex].dateStart, 'UTC').format('l LT')}</Cell>
            )}
            {...this.props.datatable.columns.dateStart} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.state.columnSorts.dateEnd
                  ? this.state.columnSorts.dateEnd.direction
                  : null}
                {...this.props.datatable.columns.dateEnd}>
                Date End
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {moment.tz(this.props.search.content[rowIndex].dateEnd, 'UTC').format('l LT')}</Cell>
            )}
            {...this.props.datatable.columns.dateEnd} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.state.columnSorts.dateOpen
                  ? this.state.columnSorts.dateOpen.direction
                  : null}
                {...this.props.datatable.columns.dateOpen}>
                Date Open
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {moment.tz(this.props.search.content[rowIndex].dateOpen, 'UTC').format('l LT')}</Cell>
            )}
            {...this.props.datatable.columns.dateOpen} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.state.columnSorts.dateEnd
                  ? this.state.columnSorts.dateEnd.direction
                  : null}
                {...this.props.datatable.columns.dateEnd}>
                Date Close
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {moment.tz(this.props.search.content[rowIndex].dateClose, 'UTC').format('l LT')}</Cell>
            )}
            {...this.props.datatable.columns.dateClose} />
        </ColumnGroup>
      </Table>
      }

    return (
      <div className='card pb-3 border-0'>
        <div className='card-block'>
          <h4 className='card-title'>Terms</h4>
          <p className='card-text'>
            An academic term (or simply "term") is a portion of an academic year, the time during which an educational
            institution holds classes. The schedules adopted vary widely.
          </p>
          <ul className='list-unstyled'>
            <li>
              A quarter system divides the academic year into four terms, one per season, with attendance required in
              three quarters per year to total 32 to 36 weeks of instruction.
            </li>
            <li>
              A semester system divides the academic year into two terms of equal length, with attendance required in
              both semesters to total 32 to 36 weeks of instruction. There is often an optional summer session half as
              long as a full semester.
            </li>
          </ul>
        </div>
        {dt}
        <TermForm
          onSave={this.saveTerm}
          onCancel={this.cancelSaveTerm}
          viewerVisible={this.state.termViewerVisible}
          viewerReadonly={this.state.termViewerReadonly}
          term={this.state.term} />
      </div>
    )
  }
}

export default Terms
