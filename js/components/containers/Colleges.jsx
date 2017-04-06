import C from '../../constants'
import Colleges from '../ui/Colleges'
import {connect} from 'react-redux'
import * as appActions from '../../actions/application'
import * as collegeActions from '../../actions/colleges'

const mapStateToProps = (state, props) =>
  ({
    collegeId: state.collegeId,
    districts: state.cccapply.districts.search.content,
    fetching: state.cccapply.colleges.fetching,
    search: state.cccapply.colleges.search,
    datatable: state.cccapply.colleges.config.datatable
  })

const mapDispatchToProps = dispatch =>
  ({
    initColleges() {
      dispatch(
        collegeActions.initColleges())
    },
    setCollege(collegeId) {
      dispatch(
        appActions.changeCollegeId(collegeId))
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
        collegeActions.sortChange(newIndexes, [newSort])
      )
    },
    updateColumnWidth(newColumnWidth, columnKey) {
      dispatch(
        appActions.updateColumnWidth(newColumnWidth, columnKey))
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Colleges)
