import React from 'react'
import { Cell } from 'fixed-data-table'

class CheckboxCell extends React.Component {
  constructor(props) {
    super(props)
    this._onCheckChange = this._onCheckChange.bind(this)
    this.clear = this.clear.bind(this)
    this.state = {isChecked: false}
  }

  _onCheckChange(e) {
    this.setState({isChecked: e.target.checked})
    if(this.props.rowSelectChange) {
      this.props.rowSelectChange(
        this,
        this.props.columnKey,
        e.target.checked,
        e.target.value)
    }
  }

  clear() {
    this.setState((prevState, props) => ({
      isChecked: false
    }))
  }

  render() {
    const {...props} = this.props
    return (
      <Cell width={props.width} height={props.height} columnKey={props.columnKey}>
        <div className='form-check'>
          <input className='form-check-input mx-auto'
                 type='checkbox'
                 checked={this.state.isChecked}
                 value={props.rowIndex}
                 onChange={this._onCheckChange} />
        </div>
      </Cell>
    )
  }
}

export default CheckboxCell
