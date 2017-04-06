import React from 'react'

class CollegeForm extends React.Component {
  constructor(props) {
    super(props)

    this.formSubmit = this.formSubmit.bind(this)
    this.cancelClick = this.cancelClick.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.dateInputChange = this.dateInputChange.bind(this)
    this.checkInputChange = this.checkInputChange.bind(this)
    this.districtChange = this.districtChange.bind(this)
    this.academicYearChange = this.academicYearChange.bind(this)
    this.convertTextStateValue = this.convertTextStateValue.bind(this)
    this.convertDateStateValue = this.convertDateStateValue.bind(this)

    this.state = {
      selectedDistrict: '',
      college: {
        academicYear: props.college.academicYear,
        address1: props.college.address1,
        address2: props.college.address2,
        city: props.college.city,
        contactPerson: props.college.contactPerson,
        created: props.college.created,
        district: props.college.district,
        email: props.college.email,
        enableMultipleMeasures: props.college.enableMultipleMeasures,
        fax: props.college.fax,
        goLiveDate: props.college.goLiveDate,
        id: props.college.id,
        lastModified: props.college.lastModified,
        name: props.college.name,
        phone: props.college.phone,
        phoneOutside: props.college.phoneOutside,
        postalcode: props.college.postalcode,
        redirectUrl: props.college.redirectUrl,
        skinBackground: props.college.skinBackground,
        skinLogo: props.college.skinLogo,
        skinLogoMimeType: props.college.skinLogoMimeType,
        skinPosition: props.college.skinPosition,
        url: props.college.url
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

  districtChange(e) {
    this.setState({
      selectedDistrict: e.target.value
    })
  }

  academicYearChange(e) {
    this.setState({
      college: {
        ...this.state.college,
        academicYear: e.target.value
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
      ...nextProps.college,
      'created': this.convertDateStateValue(nextProps.college, 'created'),
      'goLiveDate': this.convertDateStateValue(nextProps.college, 'goLiveDate'),
      'lastModified': this.convertDateStateValue(nextProps.college, 'lastModified'),
      'redirectUrl': this.convertTextStateValue(nextProps.college, 'redirectUrl'),
      'skinBackground': this.convertTextStateValue(nextProps.college, 'skinBackground'),
      'skinLogo': this.convertTextStateValue(nextProps.college, 'skinLogo'),
      'skinLogoMimeType': this.convertTextStateValue(nextProps.college, 'skinLogoMimeType'),
      'skinPosition': this.convertTextStateValue(nextProps.college, 'skinPosition')
    }

    this.setState({
      selectedDistrict: nextProps.college.district ? nextProps.college.district.id : '',
      college:p
    })
  }

  render() {
    return this.props.viewerVisible
    ? (
        <form onSubmit={this.formSubmit}>
          <input type='hidden'
                 name='id'
                 value={this.state.college.id}
                 onChange={this.inputChange} />
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Name</label>
            <div className='col'>
              <input type='text'
                     name='name'
                     value={this.state.college.name}
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
                     value={this.state.college.address1}
                     className='form-control'
                     onChange={this.inputChange}
                     required={true} />
              <span className='help-block'>Street address for the college; first line</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Address 2</label>
            <div className='col'>
              <input type='text'
                     name='address2'
                     value={this.state.college.address2}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Street address for the college; second line</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>City</label>
            <div className='col'>
              <input type='text'
                     name='city'
                     value={this.state.college.city}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>City portion of college’s address</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Zip</label>
            <div className='col'>
              <input type='text'
                     name='postalcode'
                     value={this.state.college.postalcode}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>ZIP Code portion of college’s address</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>District</label>
            <div className='col'>
              <select value={this.state.selectedDistrict} className='form-control' onChange={this.districtChange}>
                <option value=''>Select District...</option>
                {this.props.districts}
              </select>
              <span className='help-block'>Links college to information about the district it is in.</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Phone</label>
            <div className='col'>
              <input type='text'
                     name='phone'
                     value={this.state.college.phone}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Phone number for college’s Admission Office</span>
            </div>
            <label className='col-2 col-form-label text-right'>Phone Outside</label>
            <div className='col'>
              <input type='text'
                     name='phoneOutside'
                     value={this.state.college.phoneOutside}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Fax</label>
            <div className='col'>
              <input type='text'
                     name='fax'
                     value={this.state.college.fax}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Fax number for college’s Admission Office</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Email</label>
            <div className='col'>
              <input type='text'
                     name='email'
                     value={this.state.college.email}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Email address for college’s Admission office</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Contact Person</label>
            <div className='col'>
              <input type='text'
                     name='contactPerson'
                     value={this.state.college.contactPerson}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Contact person for college’s Admission office</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>URL</label>
            <div className='col'>
              <input type='text'
                     name='url'
                     value={this.state.college.url}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>URL for college’s website</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Redirect URL</label>
            <div className='col'>
              <input type='text'
                     name='redirectUrl'
                     value={this.state.college.redirectUrl}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Redirect URL for college</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Academic (BOG) Year</label>
            <div className='col'>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="academicYear"
                    onChange={this.academicYearChange}
                    checked={this.state.college.academicYear === '1'}
                    value='1' /> Fall through Summer
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="academicYear"
                    onChange={this.academicYearChange}
                    checked={this.state.college.academicYear === '2'}
                    value='2' /> Summer through Spring
                </label>
              </div>
              <input type='text'
                     name='redirectUrl'
                     value={this.state.college.redirectUrl}
                     className='form-control'
                     onChange={this.inputChange}
                     required={false} />
              <span className='help-block'>Redirect URL for college</span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Multiple Measures Enabled</label>
            <div className='col'>
              <div className="form-check">
                <label className="form-check-label">
                  <input
                    className="form-check-input mr-1"
                    type="checkbox"
                    name='enableMultipleMeasures'
                    checked={this.state.college.enableMultipleMeasures}
                    onChange={this.checkInputChange} />
                    Enable Multiple Measures
                </label>
              </div>
              <span className='help-block'></span>
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-2 col-form-label text-right'>Go-Live Date</label>
            <div className='col'>
              <input type='date'
                     name='goLiveDate'
                     value={this.state.college.goLiveDate ? moment.tz(this.state.college.goLiveDate, 'UTC').format('YYYY-MM-DD') : ''}
                     className='form-control'
                     onChange={this.dateInputChange} />
              <span className='help-block'>The date on which the college switched to the CCCApply system.</span>
            </div>
          </div>
          { this.state.college.id &&
          <div>
            <div className='form-group row'>
              <label className='col-2 col-form-label text-right'>Created</label>
              <div className='col'>
                <input type='text'
                       name='created'
                       disabled={true}
                       value={this.state.college.created ? moment.tz(this.state.college.created, 'UTC').format('dddd, MMMM Do YYYY, h:mm:ss a') : ''}
                       className='form-control' />
                <span className='help-block'>The date and time this college was created.</span>
              </div>
            </div>
            <div className='form-group row'>
              <label className='col-2 col-form-label text-right'>Updated</label>
              <div className='col'>
                <input type='text'
                       name='lastModified'
                       disabled={true}
                       value={this.state.college.lastModified ? moment.tz(this.state.college.lastModified, 'UTC').format('dddd, MMMM Do YYYY, h:mm:ss a') : ''}
                       className='form-control' />
                <span className='help-block'>The date and time this college was last modified.</span>
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

export default CollegeForm
