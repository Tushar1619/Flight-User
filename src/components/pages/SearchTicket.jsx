import React, { useState, lazy, Suspense } from 'react';
import './searchTicket.css';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import searchBooking from '../../api/searchBooking';
import SearchImg from '../../public/images/searchBooking.jpg';


const renderTextField = ({ input, label, meta }) => {
  return (
    <TextField
      {...input}
      label={label}
      error={meta.touched && meta.invalid}
      id="outlined-size-small"
      defaultValue="Small"
      variant="outlined"
      size="small"
      style={{ width: '100%', marginBottom: '20px', backgroundColor: '#fff' }}
    />
  )
}

function SearchTicket(props) {
  const [booking, setBooking] = useState(null);
  const onSubmit = (formValues) => {
    console.log("hi", "hello")
    console.log(formValues.firstName + ' ' + formValues.lastName, "my full name ")
    searchBooking.get(`/booking/pnr/${formValues.pnr}?fullname=${formValues.firstName + ' ' + formValues.lastName}`)
      .then(res => {
        const data = res.data[0];
        const takeOffTime = new Date(data.tickets[0].flightId.takeOffTime);
        const landingTime = new Date(data.tickets[0].flightId.landingTime);
        data.tickets[0].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[0].flightId.landingTime = landingTime.toLocaleString();
        data.tickets[1].flightId.takeOffTime = takeOffTime.toLocaleString();
        data.tickets[1].flightId.landingTime = landingTime.toLocaleString();

        setBooking(data);
      })
      .catch(error => {
        setBooking({ error: 'Booking information not found!' })
      })
  }

  return (
    <div className="searchTicket">
      <div className="searchTicketContainer">
        <div className="searchTicketCard">
          <div className="formLeft">
            <h2 className="searchTicketHeading">My flight</h2>
            <p>If you want to see your booked flight, please fill out the information below:
            </p>
            <form onSubmit={props.handleSubmit(onSubmit)} style={{ marginTop: '30px', textAlign: 'center' }}>
              <Field name="pnr" component={renderTextField} label="Reservation Code" />
              <Field name="firstName" component={renderTextField} label="first name" />
              <Field name="lastName" component={renderTextField} label="last name" />
              <button className="searchTicketButton">Search</button>
            </form>
            {booking && !booking.error &&
              <div className="result">
                <div className="content">
                  <h4 className="ui sub header">Information Book tickets</h4>
                  <div className="ui small feed ticket-info">
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Reservation Code: {booking.pnr}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Ticket Type: {booking.tickets.length === 2 ? 'Round-trip' : 'One-way'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          <span>Passenger: {booking.buyerName}</span>
                          <hr />
                        </div>
                      </div>
                    </div>
                    <div className="event">
                      <div className="content">
                        <div className="summary">
                          Trip:
                          {booking.tickets[0].flightId.startFrom.name}
                          <i style={{ marginLeft: 20, marginRight: 20 }} className="fas fa-plane"></i>
                          {booking.tickets[0].flightId.destination.name}
                          <div>
                            Class: {booking.tickets[0].type};   Chair: {booking.tickets[0].seat}
                          </div>
                          <div>
                            <span>Departure at: {booking.tickets[0].flightId.takeOffTime}</span>
                            <div> Landing at: {booking.tickets[0].flightId.landingTime}</div>

                            <hr />
                            {booking.tickets[1] &&
                              <div className="event">
                                <div className="content">
                                  <div className="summary">
                                    Return trip:
                                    {booking.tickets[1].flightId.startFrom.name}
                                    <i style={{ marginLeft: 20, marginRight: 20 }} className="fas fa-plane"></i>
                                    {booking.tickets[1].flightId.destination.name}
                                    <div>
                                      Class: {booking.tickets[1].type};   Chair: {booking.tickets[1].seat}
                                    </div>
                                    <div>
                                      <span>Departure at: {booking.tickets[1].flightId.takeOffTime}</span>
                                      <div> Landing at: {booking.tickets[1].flightId.landingTime}</div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </div>
                            }
                            <div className="ui content">
                              Fare: <span className="ui header red">{booking.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'INR' })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            }
            {
              booking && booking.error &&
              <div className="searchError">
                {booking.error}
              </div>
            }
          </div>
          <img className="searchImg" src={SearchImg} alt="searchImg" />
        </div>
      </div>
    </div>
  )
}

const validate = (formValues) => {
  const error = {};
  const requiredField = [
    'pnr',
    'firstName',
    'lastName'
  ]
  requiredField.forEach(field => {
    if (!formValues[field]) {
      error[field] = 'Do not leave blank.'
    }
  })
  return error;
}

const SearchTicketForm = reduxForm({
  form: 'searchTicketForm',
  validate: validate
})(SearchTicket);

const mapStateToProps = (state) => {
  return {

  }
}

export default connect(mapStateToProps)(SearchTicketForm)
