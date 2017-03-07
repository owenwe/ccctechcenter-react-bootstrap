import { PropTypes } from 'react'
import button from 'bs4/button.js'
import '../../../stylesheets/Messages.scss'

const Messages = ({messages = [], onClearMessage = f => f}) =>
  <div className='messages'>
    {
      (messages.length)
        ? messages.map((message, i) =>
        <div key={i} className={'alert alert-dismissible ' + message.type} role='alert'>
          <button type='button' className='close' aria-label='Close' onClick={() => onClearMessage(i)}>
            <span aria-hidden='true'>&times;</span>
          </button>
          {message.text}
        </div>)
    : null
    }
  </div>

Messages.propTypes = {
  messages: PropTypes.array,
  onClearMessage: PropTypes.func
}

export default Messages
