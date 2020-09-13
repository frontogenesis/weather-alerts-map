import React from 'react'
import './App.css'

import Head from './Head'
import Navbar from '../Navbar'
import Map from '../Map'
import Alerts from '../Alerts'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usaState: 'fl',
      centerPoint: [27.766279, -81.686783], 
      zoom: 5
    }
  }

  usaState = (usaState) => {
    this.setState(() => {
      return {
        usaState: usaState
      }
    })
  }

  usaStateGeo = ({centerLat, centerLon, zoom}) => {
    this.setState({
      centerPoint: [centerLat, centerLon],
      zoom
    })
  }

  render() {
    return (
      <div className='App'>
        <Head />
        <Navbar usaState={this.usaState} geo={this.usaStateGeo}/>
        <Map className='map-wrapper' centerPoint={this.state.centerPoint} zoom={this.state.zoom} />
        <Alerts usaState={this.state.usaState} />
      </div>
    )
  }
}