import React from 'react'

class DistrictForm extends React.Component {
  constructor(props) {
    super(props)

    this.formSubmit = this.formSubmit.bind(this)
    this.cancelClick = this.cancelClick.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.dateInputChange = this.dateInputChange.bind(this)
    this.checkInputChange = this.checkInputChange.bind(this)
    this.convertTextStateValue = this.convertTextStateValue.bind(this)
    this.convertDateStateValue = this.convertDateStateValue.bind(this)

    this.state = {
      district: {
        address1: props.district.address1,
        address2: props.district.address2,
        city: props.district.city,
        colleges: props.district.colleges,
        created: props.district.created,
        email: props.district.email,
        fax: props.district.fax,
        id: props.district.id,
        lastModified: props.district.lastModified,
        multipleApps: props.district.multipleApps,
        name: props.district.name,
        phone: props.district.phone,
        postalcode: props.district.postalcode,
        url: props.district.url
      }
    }
  }

  formSubmit(e) {
    e.preventDefault()
    this.props.onSave({...this.state.college})
  }

  cancelClick(e) {
    this.props.onCancel()
  }

  inputChange(e) {
    this.setState({
      college: {
        ...this.state.college,
        [e.target.name]: e.target.value
      }
    })
  }

  dateInputChange(e) {
    let m = moment.tz(e.target.value, 'UTC')
    if (m.isValid()) {
      this.setState({
        college: {
          ...this.state.college,
          [e.target.name]: m.valueOf()
        }
      })
    }
  }

  checkInputChange(e) {
    this.setState({
      college: {
        ...this.state.college,
        [e.target.name]: e.target.checked
      }
    })
  }

  convertTextStateValue(obj, key) {
    return obj[key] ? obj[key] : ''
  }

  convertDateStateValue(obj, key) {
    return obj[key] ? moment.tz(obj[key], 'UTC').valueOf() : ''
  }

  componentWillReceiveProps(nextProps) {
    let p = {
      ...nextProps.district,
      'created': this.convertDateStateValue(nextProps.district, 'created'),
      'lastModified': this.convertDateStateValue(nextProps.district, 'lastModified'),
      'colleges': [],
      'email': this.convertTextStateValue(nextProps.district, 'email'),
      'fax': this.convertTextStateValue(nextProps.district, 'fax')
    }

    this.setState({
      district: p
    })
  }

  render() {
    return this.props.viewerVisible
      ? (
      <form onSubmit={this.formSubmit}>
        <input type='hidden'
               name='id'
               value={this.state.district.id}
               onChange={this.inputChange} />
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Name</label>
          <div className='col'>
            <input type='text'
                   name='name'
                   value={this.state.district.name}
                   className='form-control'
                   ref={input => this.nameInput = input}
                   onChange={this.inputChange} />
            <span className='help-block'>Displayed in many places in the online application process.</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Address 1</label>
          <div className='col'>
            <input type='text'
                   name='address1'
                   value={this.state.district.address1}
                   className='form-control'
                   onChange={this.inputChange}
                   required={true} />
            <span className='help-block'>Street address for the district; first line</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Address 2</label>
          <div className='col'>
            <input type='text'
                   name='address2'
                   value={this.state.district.address2}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>Street address for the district; second line</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>City</label>
          <div className='col'>
            <input type='text'
                   name='city'
                   value={this.state.district.city}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>City portion of district’s address</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Zip</label>
          <div className='col'>
            <input type='text'
                   name='postalcode'
                   value={this.state.district.postalcode}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>ZIP Code portion of district’s address</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Phone</label>
          <div className='col'>
            <input type='text'
                   name='phone'
                   value={this.state.district.phone}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>Phone number for college’s Office</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Fax</label>
          <div className='col'>
            <input type='text'
                   name='fax'
                   value={this.state.district.fax}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>Fax number for district’s Office</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Email</label>
          <div className='col'>
            <input type='text'
                   name='email'
                   value={this.state.district.email}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>Email address for district’s office</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>URL</label>
          <div className='col'>
            <input type='text'
                   name='url'
                   value={this.state.district.url}
                   className='form-control'
                   onChange={this.inputChange}
                   required={false} />
            <span className='help-block'>URL for district’s website</span>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-2 col-form-label text-right'>Multiple Applications</label>
          <div className='col'>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="form-check-input mr-1"
                  type="checkbox"
                  name='multipleApps'
                  checked={this.state.district.multipleApps}
                  onChange={this.checkInputChange} />
                Multiple Applications
              </label>
            </div>
            <span className='help-block'></span>
          </div>
        </div>
        { this.state.district.id &&
        <div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Created</label>
            <div className='col'>
              <input type='text'
                     name='created'
                     disabled={true}
                     value={this.state.district.created ? moment.tz(this.state.district.created, 'UTC').format('dddd, MMMM Do YYYY, h:mm:ss a') : ''}
                     className='form-control' />
              <span className='help-block'>The date and time this district was created.</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Updated</label>
            <div className='col'>
              <input type='text'
                     name='lastModified'
                     disabled={true}
                     value={this.state.district.lastModified ? moment.tz(this.state.district.lastModified, 'UTC').format('dddd, MMMM Do YYYY, h:mm:ss a') : ''}
                     className='form-control' />
              <span className='help-block'>The date and time this district was last modified.</span>
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

export default DistrictForm
