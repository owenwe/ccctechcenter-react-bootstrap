import React from 'react'
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table'
import SortHeaderCell from './datatable/SortHeaderCell'
import CollegeForm from './CollegeForm'
import '../../../stylesheets/DataTables.scss'

class Colleges extends React.Component {
  constructor(props) {
    super(props)

    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.saveCollege = this.saveCollege.bind(this)
    this.addCollegeClick = this.addCollegeClick.bind(this)
    this.editCollegeClick = this.editCollegeClick.bind(this)
    this.cancelSaveCollege = this.cancelSaveCollege.bind(this)

    this.state = {
      _collegeId: props.collegeId,
      _datatableConfig: props.datatable,

      datatableVisible: true,
      collegeViewerVisible: false,
      collegeViewerReadonly: false,

      selectedCollege: {},
      collegeDefault: {
        academicYear: '',
        address1: '',
        address2: '',
        city: '',
        contactPerson: '',
        created: '',
        email: '',
        enableMultipleMeasures: '',
        fax: '',
        goLiveDate: '',
        id: '',
        lastModified: '',
        name: '',
        phone: '',
        phoneOutside: "",
        postalcode: '',
        redirectUrl: '',
        skinBackground: '',
        skinLogo: '',
        skinLogoMimeType: '',
        skinPosition: '',
        url: ''
      }
    }

    if (props.search.content.length === 0) {
      props.initColleges()
    }
  }

  onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.props.updateColumnWidth(newColumnWidth, columnKey)
  }

  onSortChange(columnKey, sortDir) {
    this.props.sortChange(this.props.search.content, this.props.search.sortIndexes, columnKey, sortDir)
  }

  saveCollege(college) {
    console.log(college)
  }

  addCollegeClick(e) {
    this.setState({
      datatableVisible: false,
      collegeViewerVisible: true
    })
  }

  editCollegeClick(e) {
    let i = e.target.getAttribute('data-rowIndex')
    this.setState({
      selectedCollege: {...this.props.search.content[i]},
      datatableVisible: false,
      collegeViewerVisible: true
    })
  }

  cancelSaveCollege() {
    this.setState({
      selectedCollege: {...this.state.collegeDefault},
      datatableVisible: true,
      collegeViewerVisible: false
    })
  }

  render() {
    let districts = [], dt = null

    if (this.props.districts.length) {
      districts = this.props.districts.map(d => {
        return <option key={`mis_${d.id}`} value={d.id}>{d.name}</option>
      })
    }

    if (this.props.search.content.length && this.state.datatableVisible) {
      dt = <Table
        {...this.props.datatable.table}
        rowsCount={this.props.search.content.length}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        rowClassNameGetter={(index) => this.props.datatable.table.rowClassName}>
        <ColumnGroup fixed={true} header={
          <Cell height={this.props.datatable.table.headerHeight} className=''>
            <div className='row align-items-start'>
              <div className='col'>
                <div className='btn-group btn-group-sm' role='group' aria-label='College action buttons'>
                  <button type='button' className='btn btn-primary' onClick={this.addCollegeClick}>Add College</button>
                </div>
              </div>
            </div>
          </Cell>
        }>
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'id'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.id}>
                Code
              </SortHeaderCell>
            }
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {this.props.search.content[this.props.search.sortIndexes[rowIndex]].id}
              </Cell>)}
            {...this.props.datatable.columns.id} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'name'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.name}>
                Name
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height} className='text-left'>
                <a href='#' data-rowIndex={this.props.search.sortIndexes[rowIndex]} onClick={this.editCollegeClick}>
                  {this.props.search.content[this.props.search.sortIndexes[rowIndex]].name}
                </a>
              </Cell>)}
            {...this.props.datatable.columns.name} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'district'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.district}>
                District
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height} className='text-left'>
                {this.props.search.content[this.props.search.sortIndexes[rowIndex]].district.name}</Cell>
            )}
            {...this.props.datatable.columns.district} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'city'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.city}>
                City
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {this.props.search.content[this.props.search.sortIndexes[rowIndex]].city}
              </Cell>)}
            {...this.props.datatable.columns.city} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'goLiveDate'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.goLiveDate}>
                Go-Live Date
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>{
                this.props.search.content[rowIndex].goLiveDate
                  ? moment.tz(this.props.search.content[this.props.search.sortIndexes[rowIndex]].goLiveDate, 'UTC').format('l LT')
                  : ''
              }</Cell>
            )}
            {...this.props.datatable.columns.goLiveDate} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'lastModified'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.lastModified}>
                Updated
              </SortHeaderCell>}
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>{
                this.props.search.content[rowIndex].lastModified
                  ? moment.tz(this.props.search.content[this.props.search.sortIndexes[rowIndex]].lastModified, 'UTC').format('l LT')
                  : ''
              }</Cell>
            )}
            {...this.props.datatable.columns.lastModified} />
        </ColumnGroup>
      </Table>
    }

    return (
      <div className='card pb-3 border-0'>
        <div className='card-block'>
          <h4 className='card-title'>Colleges</h4>
          <p className='card-text'>
            Colleges are primarily two-year public institutions of higher education.<br />
            Multi-college community college districts include several individually
            accredited community colleges within one district. Each college is
            independent with distinct local administration, but they share a single
            board of trustees and report to a non-instructional central
            administrative office.
          </p>
        </div>
        {dt}
        <CollegeForm
          onSave={this.saveCollege}
          onCancel={this.cancelSaveCollege}
          viewerVisible={this.state.collegeViewerVisible}
          viewerReadonly={this.state.collegeViewerReadonly}
          districts={districts}
          college={this.state.selectedCollege} />
      </div>
    )
  }
}

export default Colleges
