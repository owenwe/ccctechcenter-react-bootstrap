import Header from './ui/Header'
import Messages from './containers/Messages'
import Footer from './ui/Footer'
import '../../stylesheets/index.scss'

export const Layout = ({children}) =>
  <div className='app-container'>
    <Header />
    <Messages />
    <div className='container-fluid'>
      {children}
    </div>
    <Footer />
  </div>
