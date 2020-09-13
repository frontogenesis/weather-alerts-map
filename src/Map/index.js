import React from 'react'
import L from 'leaflet'
import * as ELG from 'esri-leaflet-geocoder'
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css'
import 'esri-leaflet-renderers'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import InfoCard from './InfoCard'
import featureLayer from '../services'

export default class LeafletMap extends React.Component {
  constructor(props) {
    super(props)
    this.mapRef = React.createRef()
    this.state = {
      location: { lat: 29.65, lon: -82.32 },
      radar: false
    }
  }

  handleClick = (event) => {
    const { lat, lng: lon} = event.latlng
    this.setState({ 
      location: {lat, lon} 
    })
  }

  radar = () => {
    this.setState({
      radar: !this.state.radar
    })
  }

  componentDidMount() {
    const map = this.mapRef.current.leafletElement
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    searchControl.on('results', data => {
      const { lat, lng: lon } = data.latlng
      this.setState({ lat, lon })
      results.clearLayers()
    })

    map.locate()
    
    featureLayer().addTo(map)
  }

  render() {
    return (
      <div className='map-wrapper'>
        <Map className='map' 
          ref={this.mapRef}
          center={this.props.centerPoint} 
          zoom={this.props.zoom} 
          zoomControl={true} 
          minZoom={3}
          maxZoom={19}
          onLocationfound={this.handleClick}
          onClick={this.handleClick} >
          <TileLayer
          url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
          />
        </Map>
        <InfoCard location={this.state.location} />
      </div>
    )
  }
}