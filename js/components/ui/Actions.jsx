import React from 'react'

class Actions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageType: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({messageType: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.textInput.value.trim() || !this.state.messageType) {
      return
    }
    this.props.createMessage(this.textInput.value, this.state.messageType)
  }

  render() {
    return (
      <div>
        <h1>Actions</h1>
        <p>Example actions to show React-Redux</p>
        <div className='card mb-3'>
          <div className='card-block'>
            <h3 className='card-title'>Messages</h3>
            <h6 className='card-subtitle text-muted'>(Action Examples)</h6>
            <p className='card-text'>
              Use the controls below to create either an info, warning, error, or success message.
            </p>
            <form className='form-inline' onSubmit={this.handleSubmit}>
              <label className='sr-only'>Message</label>
              <input ref={input => {
                this.textInput = input
              }}
                     type='text'
                     className='form-control mb-4 mr-sm-3 mb-sm-0'
                     id='messageFormInput'
                     placeholder='Enter a message'/>

              <label className='sr-only'>Message Type</label>
              <select value={this.state.messageType} className='form-control mb-2 mr-sm-3 mb-sm-0'
                      onChange={this.handleChange}>
                <option value=''>Choose...</option>
                <option value='alert-danger'>Error</option>
                <option value='alert-warning'>Warning</option>
                <option value='alert-info'>Info</option>
                <option value='alert-success'>Success</option>
              </select>
              <button type='submit' role='button' className='btn btn-primary'>Create Message</button>
            </form>
          </div>
        </div>
        <p className='lead'>
          Messages will appear below the <code>&lt;Header&gt;</code> and the main page content.
        </p>
      </div>
    )
  }
}

export default Actions
