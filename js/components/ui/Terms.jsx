import { PropTypes } from 'react'
import TermTableRow from './TermTableRow'

const Terms = ({terms = [], onViewTerm = f => f}) =>
  <div className='card border-0'>
    <div className='card-block'>
      <h4 className='card-title'>Terms</h4>
      <p className='card-text'>
        An academic term (or simply "term") is a portion of an academic year, the time during which an educational
        institution holds classes. The schedules adopted vary widely.
      </p>
      <ul className='list-unstyled'>
        <li>
          A quarter system divides the academic year into four terms, one per season, with attendance required in
          three quarters per year to total 32 to 36 weeks of instruction.
        </li>
        <li>
          A semester system divides the academic year into two terms of equal length, with attendance required in
          both semesters to total 32 to 36 weeks of instruction. There is often an optional summer session half as
          long as a full semester.
        </li>
      </ul>
    </div>
    <table className='table table-bordered table-sm'>
      <thead className='thead-default'>
      <tr>
        <th>Term Code</th>
        <th>Description</th>
        <th>Date Start</th>
        <th>Date End</th>
        <th>Date Open</th>
        <th>Date Close</th>
      </tr>
      </thead>
      <tbody>
      {terms.map((term, i) =>
        <TermTableRow key={i} {...term} onViewTerm={onViewTerm}/>)}
      </tbody>
    </table>
  </div>

Terms.propTypes = {
  terms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      termCode: PropTypes.string.isRequired,
      description: PropTypes.string,
      college: PropTypes.object,
      archived: PropTypes.bool.isRequired,
      dateOpen: PropTypes.node,
      dateClose: PropTypes.node,
      dateStart: PropTypes.node,
      dateEnd: PropTypes.node,
      created: PropTypes.number,
      createdBy: PropTypes.string,
      lastModified: PropTypes.number,
      updatedBy: PropTypes.string
    })
  ),
  onViewTerm: PropTypes.func
}

export default Terms
