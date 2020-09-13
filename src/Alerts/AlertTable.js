import React from 'react'
import Moment from 'react-moment'

export default class AlertTable extends React.Component {
  render() {
    const alerts = this.props.data.entry
  
    // Handler for no alerts in a state
    if (!alerts.length && alerts['title']['#text'] === 'There are no active watches, warnings or advisories') {
      return <div>There are no {this.props.data.title['#text']}</div>
    // Handler for 1 alert in a state. Alerts aren't returned as an array
    } else if (!Array.isArray(alerts)) {
      return (
        <table className="table table-bordered table-sm table-hover table-responsive-xs">
          <thead className="thead-dark">
            <tr>
              <th scope="col" width='25%'>Alert Type</th>
              <th scope="col" width='50%'>Locations</th>
              <th scope="col">Begins</th>
              <th scope="col">Ends</th>
            </tr>
          </thead>
          <tbody className="table">
          {<tr key={alerts['id']['#text']}>
              <td>{alerts['cap:event']['#text']} </td>
              <td>{alerts['cap:areaDesc']['#text']} </td>
              <td><Moment format='ddd MMM D h:mm A'>{alerts['cap:effective']['#text']}</Moment></td>
              <td><Moment format='ddd MMM D h:mm A'>{alerts['cap:expires']['#text']}</Moment></td>
            </tr>}
          </tbody>
        </table>
      )
    // Handler for multiple alerts in a state
    } else {
      return (
        <table className="table table-bordered table-sm table-hover table-responsive-xs">
          <thead className="thead-dark">
            <tr>
              <th scope="col" width='25%'>Alert Type</th>
              <th scope="col" width='50%'>Locations</th>
              <th scope="col">Begins</th>
              <th scope="col">Ends</th>
            </tr>
          </thead>
          <tbody className="table">
          {alerts.map(alert => (
            <tr key={alert['id']['#text']}>
              <td>{alert['cap:event']['#text']} </td>
              <td>{alert['cap:areaDesc']['#text']} </td>
              <td><Moment format='ddd MMM D h:mm A'>{alert['cap:effective']['#text']}</Moment></td>
              <td><Moment format='ddd MMM D h:mm A'>{alert['cap:expires']['#text']}</Moment></td>
            </tr>
          ))}
          </tbody>
        </table>
      )
    }
  }
}