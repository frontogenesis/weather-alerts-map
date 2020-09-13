import React, { useState } from 'react'

import Card from 'react-bootstrap/Card'
import { Accordion } from 'react-bootstrap'

export default function LayerToggle(props) {
  const [ radar, setRadar ] = useState(false)

  const handleInputChange = (event) => {
    setRadar(event.target.checked)
    props.radarLayer(radar) 
  }

  return (
    <div className='layer-toggle-wrapper'>
      <Accordion>
        <Card border='dark'>
          <Card.Header className='layer-toggle-header'>
            <Accordion.Toggle as={Card.Header} className='layer-toggle-header' variant="link" eventKey="0">
              Weather Layers
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body className='layer-toggle-body'>
                <ul>
                  <input 
                    name='radar' 
                    type='checkbox' 
                    checked={radar} 
                    onChange={handleInputChange} /> 
                  <label>Radar</label> <br />
                  <input name='satellite' type='checkbox' />
                  <label>Satellite</label> <br />
                  <input name='lightning' type='checkbox' />
                  <label>Lightning</label>
                </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card border='dark'>
          <Card.Header className='layer-toggle-header'>
            <Accordion.Toggle as={Card.Header} className='layer-toggle-header' variant="link" eventKey="1">
              Rivers & Hydro
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body className='layer-toggle-body'>Nothing here yet</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}