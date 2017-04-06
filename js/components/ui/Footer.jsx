import React from 'react'

class Footer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <footer>
        <div className='container-fluid bg-faded'>
          <p className='lead'>Security Level: <span className='text-capitalize'>{this.props.user.role}</span></p>
        </div>
      </footer>
    )
  }
}

export default Footer
