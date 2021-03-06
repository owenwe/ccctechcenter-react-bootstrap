import Actions from '../ui/Actions'
import { connect } from 'react-redux'
import * as appActions from '../../actions/application'

const mapStateToProps = (state, props) => ({})

const mapDispatchToProps = dispatch =>
  ({
    createMessage(message, type) {
      console.log(`createMessage(message: ${message}, type: ${type}`)
      dispatch(
        appActions.addMessage(message, type)
      )
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
