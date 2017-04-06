import C from '../../constants'
import {connect} from 'react-redux'
import Districts from '../ui/Districts'
import * as appActions from '../../actions/application'
import * as districtActions from '../../actions/districts'

const mapStateToProps = (state, props) =>
  ({
    user: state.user,
    collegeId: state.collegeId,
    fetching: state.cccapply.districts.fetching,
    search: state.cccapply.districts.search,
    datatable: state.cccapply.districts.config.datatable
  })

const mapDispatchToProps = dispatch =>
  ({
    initDistricts() {
      dispatch(
        districtActions.initDistricts()
      )
    },
    sortChange(data, indexes, columnKey, sortDir) {
      let newIndexes = appActions.sortChange(data, indexes, columnKey, sortDir),
        newSort = {
          property: columnKey,
          ascending: sortDir === C.SORT_TYPE_ASC,
          descending: sortDir === C.SORT_TYPE_DESC,
          direction: sortDir
        }
      dispatch(
        districtActions.sortChange(newIndexes, [newSort])
      )
    },
    updateColumnWidth(newColumnWidth, columnKey) {
      dispatch(
        appActions.updateColumnWidth(newColumnWidth, columnKey))
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Districts)
