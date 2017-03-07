import Messages from '../ui/Messages'
import * as appActions from '../../actions/application'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearMessage(index) {
      dispatch(
        appActions.clearMessage(index)
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
