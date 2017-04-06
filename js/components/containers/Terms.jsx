import Terms from '../ui/Terms'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as appActions from '../../actions/application'
import * as termActions from '../../actions/terms'

const mapStateToProps = (state, props) => {
  state.cccapply.terms.college = state.collegeId
    ? state.collegeId
    : state.cccapply.terms.college

  return ({
    user: state.user,
    collegeId: state.cccapply.terms.college,
    colleges: state.cccapply.colleges.search.content,
    fetching: state.cccapply.terms.fetching,
    search: state.cccapply.terms.search,
    datatable: state.cccapply.terms.config.datatable
  })
}

const mapDispatchToProps = dispatch =>
  ({
    changeRole(newRole) {
      dispatch(
        appActions.changeUserRole(newRole))
    },
    setCollege(collegeId) {
      dispatch(
        termActions.changeCollege(collegeId))
    },
    updateColumnWidth(newColumnWidth, columnKey) {
      dispatch(
        appActions.updateColumnWidth(newColumnWidth, columnKey))
    },
    searchTerms(collegeId, page, size, sort, after) {
      dispatch(
        termActions.searchTerms(collegeId, page, size, sort, after))
    },
    addTerm({termCode, description, dateStart, dateEnd, dateOpen, dateClose}) {
      console.log(`TODO Add Term (termCode: ${termCode}, description: ${description}, dateStart: ${dateStart}, dateEnd: ${dateEnd}, dateOpen: ${dateOpen}, dateClose: ${dateClose})`)
    },
    importTerms() {
      console.log(`TODO Import Terms`)
    },
    exportTerms() {
      console.log(`TODO Export Terms`)
    },
    archiveTerms() {
      console.log(`TODO Archive Terms`)
    }
  })

const Container = connect(mapStateToProps, mapDispatchToProps)(Terms)

export default withRouter(Container)
