import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { usaStatesMetaData } from '../utils/validateUSAStates'

export default class AlertsNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      usaState: '',
    }
  }

  getLatLonZoom = () => usaStatesMetaData.map(usaStateObj => usaStateObj[this.state.usaState])[0]

  validate = () => {
    if (!this.state.usaState) {
      return false
    } else {
      return usaStatesMetaData.some(usaStateObj => Object.keys(usaStateObj).includes(this.state.usaState))
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const isValidState = this.validate()
    if (!isValidState) {
      alert('That isn\'t a state. Give it another shot!')
      this.setState({ usaState: ''})
    } else {
      this.props.usaState(this.state.usaState)
      this.props.geo(this.getLatLonZoom())
      this.setState({ usaState: ''})
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value.toLowerCase()
    })
  }

  render() {
    return (
      <div className='nav-wrapper'>
        <Navbar bg='primary' variant='dark' expand='lg'>
          <Navbar.Brand>Alerts Dashboard</Navbar.Brand>
          <Form inline className='ml-auto' onSubmit={this.handleSubmit}>
            <Form.Control 
              type='text'
              name='usaState'
              value={this.state.usaState.toLowerCase()}
              onChange={this.handleChange}
              maxLength='2'
              width='10%'
              placeholder='Enter Two-Letter State ID' 
              className='mr-sm-2' />
            <Button variant='dark' type='submit'>Fetch Alerts</Button>
          </Form>
        </Navbar>
      </div>
    )
  }
}