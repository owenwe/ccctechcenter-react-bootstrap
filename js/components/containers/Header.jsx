import {connect} from 'react-redux'
import Header from '../ui/Header'
import * as appActions from '../../actions/application'

const mapStateToProps = (state, props) =>
  ({
    user: state.user
  })

const mapDispatchToProps = dispatch =>
  ({
    changeRole(newRole) {
      dispatch(
        appActions.changeUserRole(newRole))
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Header)
