import React from 'react'

import AlertTable from './AlertTable'
import xmlToJson from '../utils/xmlToJson'

export default class Alerts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      alerts: [],
    }
  }

  getAlerts = () => {
    fetch(`https://alerts.weather.gov/cap/${this.props.usaState.toLowerCase()}.php?x=0`)
      .then(response => response.text())
      .then(text => (new DOMParser()).parseFromString(text, 'text/xml'))
      .then(
        (alerts) => {
          this.setState({
            isLoaded: true,
            alerts: xmlToJson(alerts.getElementsByTagName('feed')[0])
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.getAlerts()
  }

  componentDidUpdate(prevProps, _) {
    if (this.props.usaState !== prevProps.usaState) {
      this.getAlerts()
    }
  }

  render() {
    const { error, isLoaded, alerts } = this.state

    if (error) {
      return <div>{error.message}</div>
    } else if (!isLoaded) {
      return <div>Retrieving data...</div>
    } else {
      return <div className='alert-wrapper'><AlertTable data={alerts} /></div>
    }
  }
}