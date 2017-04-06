import React from 'react'
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table'
import SortHeaderCell from './datatable/SortHeaderCell'
import DistrictForm from './DistrictForm'
import '../../../stylesheets/DataTables.scss'

class Districts extends React.Component {
  constructor(props) {
    super(props)

    this.onColumnResizeEndCallback = this.onColumnResizeEndCallback.bind(this)
    this.onSortChange = this.onSortChange.bind(this)
    this.saveDistrict = this.saveDistrict.bind(this)
    this.addDistrictClick = this.addDistrictClick.bind(this)
    this.editDistrictClick = this.editDistrictClick.bind(this)
    this.cancelSaveDistrict = this.cancelSaveDistrict.bind(this)

    this.state = {
      collegeId: props.collegeId,
      datatableConfig: props.datatable,

      datatableVisible: true,
      districtViewerVisible: false,
      districtViewerReadonly: false,

      selectedDistrict: {},
      districtDefault: {
        address1: '',
        address2: '',
        city: '',
        colleges: [],
        created: '',
        email: '',
        fax: '',
        id: '',
        lastModified: '',
        multipleApps: '',
        name: '',
        phone: '',
        postalcode: '',
        url: ''
      }
    }

    if (props.search.content.length === 0) {
      props.initDistricts()
    }
  }

  onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.props.updateColumnWidth(newColumnWidth, columnKey)
  }

  onSortChange(columnKey, sortDir) {
    this.props.sortChange(
      this.props.search.content,
      this.props.search.sortIndexes,
      columnKey,
      sortDir)
  }

  saveDistrict(district) {
    console.log(district)
  }

  addDistrictClick(e) {
    this.setState({
      datatableVisible: false,
      districtViewerVisible: true
    })
  }

  editDistrictClick(e) {
    let i = e.target.getAttribute('data-rowIndex')
    this.setState({
      selectedDistrict: {...this.props.search.content[i]},
      datatableVisible: false,
      districtViewerVisible: true
    })
  }

  cancelSaveDistrict() {
    this.setState({
      selectedDistrict: {...this.state.districtDefault},
      datatableVisible: true,
      districtViewerVisible: false
    })
  }

  render() {
    let dt = null

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
                  <button type='button' className='btn btn-primary' onClick={this.addDistrictClick}>Add District</button>
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
              </SortHeaderCell>
            }
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height} className='text-left'>
                <a href='#' data-rowIndex={this.props.search.sortIndexes[rowIndex]} onClick={this.editDistrictClick}>
                  {this.props.search.content[this.props.search.sortIndexes[rowIndex]].name}
                </a>
              </Cell>)}
            {...this.props.datatable.columns.name} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'city'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.city}>
                City
              </SortHeaderCell>
            }
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {this.props.search.content[this.props.search.sortIndexes[rowIndex]].city}
              </Cell>)}
            {...this.props.datatable.columns.city} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'url'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.url}>
                URL
              </SortHeaderCell>
            }
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {this.props.search.content[this.props.search.sortIndexes[rowIndex]].url}
              </Cell>)}
            {...this.props.datatable.columns.url} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'multipleApps'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.multipleApps}>
                Multi App
              </SortHeaderCell>
            }
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>
                {this.props.search.content[this.props.search.sortIndexes[rowIndex]].multipleApps ? 'Yes' : 'No'}
              </Cell>)}
            {...this.props.datatable.columns.multipleApps} />
          <Column
            header={
              <SortHeaderCell
                onSortChange={this.onSortChange}
                sortDir={this.props.search.sort[0].property === 'lastModified'
                  ? this.props.search.sort[0].direction
                  : null}
                {...this.props.datatable.columns.lastModified}>
                Updated
              </SortHeaderCell>
            }
            cell={({rowIndex, width, height}) => (
              <Cell width={width} height={height}>{
                this.props.search.content[rowIndex].lastModified
                  ? moment.tz(this.props.search.content[this.props.search.sortIndexes[rowIndex]].lastModified, 'UTC').format('l LT')
                  : ''
              }</Cell>)}
            {...this.props.datatable.columns.lastModified} />
        </ColumnGroup>
      </Table>
    }

    return (
      <div className='card pb-3 border-0'>
        <div className='card-block'>
          <h4 className='card-title'>Districts</h4>
          <p className='card-text'></p>
        </div>
        {dt}
        <DistrictForm
          onSave={this.saveDistrict}
          onCancel={this.cancelSaveDistrict}
          viewerVisible={this.state.districtViewerVisible}
          viewerReadonly={this.state.collegeViewerReadonly}
          district={this.state.selectedDistrict}/>
      </div>
    )
  }
}

export default Districts
