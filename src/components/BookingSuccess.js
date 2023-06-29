import React from 'react';
import './bookingSuccess.css';
import { connect } from 'react-redux'


function BookingSuccess(props) {
  const { ticket, flight, returnFlight } = props;
  return (
    <div className="bookingSuccess">
      <div className="ui card ticket">
        <div className="content">
          <div className="header header--green">Book tickets successfully!</div>
        </div>
        <div className="content">
          <div className="ui small feed ticket-info">
            <div className="event">
              <div className="content">
                <div className="summary center">
                  <span>Reservation Code: {ticket.pnr}</span>
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  <span>Passenger: {ticket.buyerName}</span>
                  <hr />
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary center">
                  {flight.startFrom.name}
                  <i style={{ marginLeft: 20, marginRight: 20 }} class="fas fa-plane"></i>
                  {flight.destination.name}
                  {props.selectedSeat && props.selectedSeat[0] &&
                    <p>Class: {props.flight.type}  Chair: {props.selectedSeat[0].id}</p>
                  }
                  <div>
                    <span>Departure at: {flight.takeOffTime}</span>
                    <div> Landing at: {flight.landingTime}</div>
                    <hr />
                    {returnFlight &&
                      <div className="event">
                        <div className="content">
                          <div className="summary center">
                            {returnFlight.startFrom.name}
                            <i style={{ marginLeft: 20, marginRight: 20 }} class="fas fa-plane"></i>
                            {returnFlight.destination.name}
                            {props.selectedReturnSeat && props.selectedReturnSeat[0] &&
                              <p>Class: {props.returnFlight.type}  Chair: {props.selectedReturnSeat[0].id}</p>
                            }
                            <div>
                              <span>Departure at: {returnFlight.takeOffTime}</span>
                              <div> Landing at: {returnFlight.landingTime}</div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </div>
                    }
                    <div className="ui content">
                      Total Fare: <span className="ui header red">{ticket.totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'INR' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const flight = state.selectedFlight;
  const takeOffTime = new Date(flight.takeOffTime);
  const landingTime = new Date(flight.landingTime);
  flight.takeOffTime = takeOffTime.toLocaleString();
  flight.landingTime = landingTime.toLocaleString();

  const returnFlight = state.selectedReturnFlight;
  if (returnFlight) {
    const takeOffTime2 = new Date(returnFlight.takeOffTime);
    const landingTime2 = new Date(returnFlight.landingTime);
    returnFlight.takeOffTime = takeOffTime2.toLocaleString();
    returnFlight.landingTime = landingTime2.toLocaleString();
  }

  return {
    ticket: state.ticket,
    flight: flight,
    returnFlight: returnFlight,
    selectedSeat: Object.values(state.selectedSeat),
    selectedReturnSeat: Object.values(state.selectedReturnSeat),
  }
}

export default connect(mapStateToProps)(BookingSuccess)
