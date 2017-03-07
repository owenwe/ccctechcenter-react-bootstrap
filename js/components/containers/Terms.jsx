import Terms from '../ui/Terms'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) =>
  ({
    terms: state.terms.suggestions
  })

const mapDispatchToProps = dispatch =>
  ({
    onViewTerm(term) {
      console.log('viewing term')
      console.log(term)
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Terms)
