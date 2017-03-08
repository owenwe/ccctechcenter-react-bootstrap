import { PropTypes } from 'react'

const TermTableRow = ({
  archived,
  college,
  created,
  createdBy,
  dateClose,
  dateEnd,
  dateOpen,
  dateStart,
  description,
  id,
  lastModified,
  termCode,
  updatedBy
}) =>
  <tr>
    <td><small>{termCode}</small></td>
    <td><small>{description}</small></td>
    <td><small>{new Date(dateStart).toLocaleString()}</small></td>
    <td><small>{new Date(dateEnd).toLocaleString()}</small></td>
    <td><small>{new Date(dateOpen).toLocaleString()}</small></td>
    <td><small>{new Date(dateClose).toLocaleString()}</small></td>
  </tr>

TermTableRow.propTypes = {
  termCode: PropTypes.string.isRequired,
  description: PropTypes.string,
  dateStart: PropTypes.timestamp,
  dateEnd: PropTypes.timestamp,
  dateOpen: PropTypes.timestamp,
  dateClose: PropTypes.timestamp
}

export default TermTableRow
