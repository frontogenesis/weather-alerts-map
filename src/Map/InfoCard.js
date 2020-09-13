import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import L from 'leaflet'
import { Query } from 'esri-leaflet'
import moment from 'moment'

export default function InfoCard({location}) {
  const { lat, lon } = location
  const [events, setEvents] = useState([])
  
  useEffect(() => {
    new Query({
      url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NWS_Watches_Warnings_v1/FeatureServer/6'
    }).intersects(L.latLng(lat, lon)).run((err, results) => {
      const { features } = results
      setEvents(features)
    })
  }, [lat, lon])

  const hazards = events.map((event, key) => {
    return (
      <React.Fragment key={key}>
        <Card.Title>{event.properties.Event}</Card.Title>
        <Card.Text>
          Starts: {moment(event.properties.Start).format('ddd MMM D h:mm A')}<br />
          Ends: {moment(event.properties.End_).format('ddd MMM D h:mm A')}
        </Card.Text>
      </React.Fragment>
    )
  })

  return (
    <div className='card-wrapper'>
      <Card border='dark' className='card-hazard'>
        <Card.Header as='h4' className='card-header-hazard'>Potential Hazards</Card.Header>
        <Card.Body className='card-body-hazard'>
          {events.length > 0 ? hazards : <Card.Title>No Active Hazards</Card.Title>}
        </Card.Body>
      </Card>
    </div>   
  )
}