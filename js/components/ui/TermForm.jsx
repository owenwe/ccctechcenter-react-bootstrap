import React from 'react'

class TermForm extends React.Component {
  constructor(props) {
    super(props)

    this.formSubmit = this.formSubmit.bind(this)
    this.cancelClick = this.cancelClick.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.dateInputChange = this.dateInputChange.bind(this)

    this.state = {
      id: props.term.id,
      termCode: props.term.termCode,
      description: props.term.description,
      college: props.term.college,
      collegeId: props.term.collegeId,
      created: props.term.created,
      createBy: props.term.createdBy,
      dateClose: props.term.dateClose,
      dateEnd: props.term.dateEnd,
      dateOpen: props.term.dateOpen,
      dateStart: props.term.dateStart,
      lastModified: props.term.lastModified,
      updatedBy: props.term.updatedBy
    }
  }

  formSubmit(e) {
    e.preventDefault()
    this.props.onSave({...this.state})
  }

  cancelClick(e) {
    this.props.onCancel()
  }

  inputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  dateInputChange(e) {
    let m = moment.tz(e.target.value, 'UTC')
    if (m.isValid()) {
      this.setState({
        [e.target.name]: m.valueOf()
      })
    }
  }

  convertTextStateValue(obj, key) {
    return obj[key] ? obj[key] : ''
  }

  convertDateStateValue(obj, key) {
    return obj[key] ? moment.tz(obj[key], 'UTC').valueOf() : ''
  }

  componentWillReceiveProps(nextProps) {
    let p = {
      ...nextProps.term,
      'dateStart': this.convertDateStateValue(nextProps.term, 'dateStart'),
      'dateEnd': this.convertDateStateValue(nextProps.term, 'dateEnd'),
      'dateClose': this.convertDateStateValue(nextProps.term, 'dateClose'),
      'dateOpen': this.convertDateStateValue(nextProps.term, 'dateOpen'),
      'created': this.convertDateStateValue(nextProps.term, 'created'),
      'lastModified': this.convertDateStateValue(nextProps.term, 'lastModified'),
      'createBy': this.convertTextStateValue(nextProps.term, 'createBy'),
      'updatedBy': this.convertTextStateValue(nextProps.term, 'updatedBy')
    }

    this.setState(p)
  }

  render() {
    return this.props.viewerVisible
      ? (
      <form onSubmit={this.formSubmit}>
        <input type='hidden'
               name='id'
               value={this.state.id}
               onChange={this.inputChange} />
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Term Code</label>
          <div className='col'>
            <input type='text'
                   name='termCode'
                   value={this.state.termCode}
                   className='form-control'
                   ref={input => this.termCodeInput = input}
                   onChange={this.inputChange} />
            <span className='help-block'>Typically, this will be what a college will want to download as an identifier for the term applied for.</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Description</label>
          <div className='col'>
            <input type='text'
                   name='description'
                   value={this.state.description}
                   className='form-control'
                   onChange={this.inputChange} />
            <span className='help-block'>Appears in menu for Term Applied For if term is open</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Start</label>
          <div className='col'>
            <input type='date'
                   name='dateStart'
                   value={this.state.dateStart ? moment.tz(this.state.dateStart, 'UTC').format('YYYY-MM-DD') : ''}
                   className='form-control'
                   onChange={this.dateInputChange} />
            <span className='help-block'>The date on which the college-defined term starts (i.e., first day of classes).</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>End</label>
          <div className='col'>
            <input type='date'
                   name='dateEnd'
                   value={this.state.dateEnd ? moment.tz(this.state.dateEnd, 'UTC').format('YYYY-MM-DD') : ''}
                   className='form-control'
                   onChange={this.dateInputChange} />
            <span className='help-block'>The date on which the college-defined term ends.</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Open</label>
          <div className='col'>
            <input type='datetime-local'
                   name='dateOpen'
                   value={this.state.dateOpen ? moment.tz(this.state.dateOpen, 'UTC').format('YYYY-MM-DDTHH:mm') : ''}
                   className='form-control'
                   onChange={this.dateInputChange} />
            <span className='help-block'>Date when a user can begin an application for this term.</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Close</label>
          <div className='col'>
            <input type='datetime-local'
                   name='dateClose'
                   value={this.state.dateClose ? moment.tz(this.state.dateClose, 'UTC').format('YYYY-MM-DDTHH:mm') : ''}
                   className='form-control'
                   onChange={this.dateInputChange} />
            <span className='help-block'>Date when the college-defined term no longer appears in the “Term Applying For” menu. The last day a user can begin or submit an application for this term.</span>
          </div>
        </div>
        { this.state.id &&
          <div>
            <div className='form-group row'>
              <label className='col-2 col-form-label text-right'>Created</label>
              <div className='col'>
                <input type='text'
                  name='created'
                  disabled={true}
                  value={this.state.created ? moment.tz(this.state.created, 'UTC').format('dddd, MMMM Do YYYY, h:mm:ss a') : ''}
                  className='form-control' />
                <span className='help-block'>The date and time this term was created.</span>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-2 col-form-label text-right'>Created By</label>
              <div className='col'>
                <input type='text'
                  name='createdBy'
                  disabled={true}
                  value={this.state.createBy}
                  className='form-control' />
                <span className='help-block'>The user responsible for creating this term.</span>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-2 col-form-label text-right'>Updated</label>
              <div className='col'>
                <input type='text'
                  name='lastModified'
                  disabled={true}
                  value={this.state.lastModified ? moment.tz(this.state.lastModified, 'UTC').format('dddd, MMMM Do YYYY, h:mm:ss a') : ''}
                  className='form-control' />
                <span className='help-block'>The date and time this term was last modified.</span>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-2 col-form-label text-right'>Updated By</label>
              <div className='col'>
                <input type='text'
                  name='updatedBy'
                  disabled={true}
                  value={this.state.updatedBy}
                  className='form-control' />
                <span className='help-block'>The last user to make a modification to this term.</span>
              </div>
            </div>
          </div>
        }
        <div className='form-group row'>
          <div className='col text-center'>
            <button type='button' className='btn btn-secondary mr-2' onClick={this.cancelClick}>Cancel</button>
            <button type='submit' className='btn btn-primary'>Save</button>
          </div>
        </div>
      </form>
      )
      : null
  }
}

export default TermForm
