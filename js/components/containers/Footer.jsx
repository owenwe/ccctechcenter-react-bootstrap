import {connect} from 'react-redux'
import Footer from '../ui/Footer'

const mapStateToProps = (state, props) =>
  ({
    user: state.user
  })

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
