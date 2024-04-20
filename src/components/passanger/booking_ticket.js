import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import NavBar from "./common/after_login";
import "./BusSeatStructure.css";
import PayPalCheckout from "./PayPalCheckout";
import { useLocation } from 'react-router-dom';

const seats = [];

function BookingTicket() {
  const [route, setRouteNumber] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [timeSlotForSave, setTimeSlotForSave] = useState("");
  const [selectedBus, setSelectedBus] = useState("");
  const [busDetails, setBusDetails] = useState("");
  const [numRows, setNumRows] = useState(0);
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [tPrice, setTPrice] = useState(0);
  const [bookingDate, setBookingDate] = useState("");
  const [num_of_t_passangers, setNumOfTotalPassangers] = useState(0);
  const [selectedTotalPassangers, setSelectedTotalPassangers] = useState(0);
  const [email, setEmail] = useState("");
  const [busRoutes, setBusRoutes] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrices, setTicketPrices] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [userID, setUserID] = useState(0);
  const [bookingId, setBookingID] = useState(0);
  const [displayStatus, setDisplayStaus] = useState("none");
  const [paymentFor, setpaymentFor] = useState("ticket_booking");
  const [disabledButton, setDisabledButton] = useState(0);

  useEffect(() => {
    getTicketPrices();
    fetchBusRouteData();

    var userDate = Cookies.get("profile");
    var user_json = JSON.parse(userDate);
    setUserID(user_json["userId"]);
    setEmail(user_json["email"]);
  }, []);

  async function getTicketPrices() {
    try {
      const response = await fetch(
        "http://localhost:5000/ticket_price/getAllRole"
      );
      const jsonData = await response.json();
      const result = jsonData.map(({ role_name, price }) => ({
        role_name,
        price,
      }));
      setTicketPrices(result);
    } catch (error) {
      console.error("Error fetching ticket prices:", error);
    }
  }

  const getAllCurrentBookings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/ticketBooking/getBookings/" +
          route +
          "/" +
          timeSlotForSave +
          "/" +
          bookingDate
      );
      const data = response.data;
      setCurrentBookings(data.bookedSeats);
      console.log(data.bookedSeats);

      const bookedSeatIds = new Set(data.bookedSeats);
      const updatedArr = seats.map((seat) => ({
        ...seat,
        type: bookedSeatIds.has(String(seat.id))
          ? "alreadybooked"
          : "available",
      }));

      var num_of_t_passangers =
        parseInt(numberOfAdults) + parseInt(numberOfChildren);

      setSeats(updatedArr);
      setNumOfTotalPassangers(num_of_t_passangers);
    } catch (error) {
      console.error("Error fetching current bookings:", error);
    }
  };

  const handleTimeTemplate = (e) => {
    try {
      const selectedSlotData = JSON.parse(e.target.value);
      setSelectedBus(selectedSlotData.busNumber);
      setTimeSlot(e.target.value);
      getBusDetails(selectedSlotData.busNumber);
      setTimeSlotForSave(selectedSlotData._id);
    } catch (error) {
      console.error("Error parsing selected time slot data:", error);
    }
  };

  const handleBusRoute = (e) => {
    const selectedRoute = e.target.value;
    setRouteNumber(selectedRoute);
    if (selectedRoute) {
      getTimeSlots(selectedRoute);
    }
  };

  const getTimeSlots = (selectedRoute) => {
    axios
      .post(
        `http://localhost:5000/ticketBooking/getTimeTempUsingRoute/${selectedRoute}`
      )
      .then((response) => {
        setTimeSlots(response.data);
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  };

  const getBusDetails = (selectedBus) => {
    axios
      .get(`http://localhost:5000/bus/getBusDataFromBusNumber/${selectedBus}`)
      .then((response) => {
        setBusDetails(response.data);
        var seats_capacity = response.data.passengersCapacity;
        var without_last_row = seats_capacity - 5;

        const seats = Array.from({ length: without_last_row }, (_, index) => ({
          id: index + 1,
          type: "available",
        }));
        var numRows = Math.ceil(seats.length / 5);

        setSeats(seats);
        setNumRows(numRows);
      })
      .catch((error) => {
        console.error("Error fetching bus details:", error);
      });
  };

  const fetchBusRouteData = async () => {
    try {
      const response = await fetch("http://localhost:5000/bus_route/getRoutes");
      const jsonData = await response.json();
      setBusRoutes(jsonData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const handleSeatClick = (id) => {
    const seatAlreadySelected = selectedSeats.includes(id);
    if (seatAlreadySelected) {
      setSelectedSeats(selectedSeats.filter((seatId) => seatId !== id));
      setSelectedTotalPassangers(parseInt(selectedTotalPassangers) - 1);
    } else {
      setSelectedTotalPassangers(parseInt(selectedTotalPassangers) + 1);
      if (num_of_t_passangers - 1 >= selectedTotalPassangers) {
        setSelectedSeats([...selectedSeats, id]);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Passenger Count is Exceeded.",
          text: "Adult and children count is " + num_of_t_passangers,
        });
      }
    }
  };

  async function get_ticket_price() {
    setTPrice(calculateTotalPrice());
  }

  const calculateTotalPrice = () => {
    const adultPrice =
      ticketPrices.find((item) => item.role_name === "Adult")?.price || 0;
    const childrenPrice =
      ticketPrices.find((item) => item.role_name === "Child")?.price || 0;

    const totalPrice =
      numberOfAdults * adultPrice + numberOfChildren * childrenPrice;
    return totalPrice.toFixed(2);
  };

  function booking_complete() {
    const newBookingData = {
      customerId: userID,
      bus: selectedBus,
      route,
      timeSlot: timeSlotForSave,
      bookingDate,
      price: tPrice,
      passengers: numberOfAdults + "," + numberOfChildren,
      seatNumbers: selectedSeats,
    };

    let data = {
      email: email,
      rest: newBookingData,
    };

    axios
      .post("http://localhost:5000/ticketBooking/addBookings", data)
      .then((response) => {
        const responseData = response.data;
        setBookingID(response.data._id);
        setDisabledButton(response.data._id);
        console.log("disable: " + disabledButton)
        setDisplayStaus("inline");
        // Handle success
        Swal.fire({
          icon: "success",
          title: "Booking Complete!",
          text: responseData.message,
        });
      })
      .catch((error) => {
        // Handle error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while saving the booking.",
        });
      });
  }

  function back() {
    window.location.href = "../passanger/PassangerDashboard";
  }

  const location = useLocation();
  const { state } = location;

  if (state && state.disabledButton !== undefined) {
    const disabledButton = state.disabledButton;

    console.log('disabledButto in PassangerDashboard:', disabledButton);
  }

  return (
    <>
      <div style={{ backgroundColor: "#E2E7E9" }}>
        <NavBar />

        <div class="container pt-5" style={{ paddingBottom: "20%" }}>
          <div className="container" style={{ paddingTop: "5%" }}>
            <h3 className="text-uppercase">Customer Dashboard</h3>
            <div className="mt-4 text-end">
              <MDBBtn color="dark" onClick={back} outline className="shadow-0">
                Back
              </MDBBtn>
            </div>
            <hr />
            <div>
              <div className="rounded p-3" style={{ backgroundColor: "white" }}>
                <h5 className="text-uppercase pt-3">Select A Bus</h5>

                <hr />
                <div className="row pt-3">
                  <div className="col">
                    <div
                      className="card h-100 p-4"
                      style={{
                        backgroundColor: "#ECECEB",
                        border: "1px solid #BFBFBA",
                      }}
                    >
                      <div className="mb-3">
                        <label htmlFor="routeNumber" className="form-label">
                          Route
                        </label>
                        <select
                          className="form-select"
                          value={route}
                          onChange={handleBusRoute}
                        >
                          <option value="">Bus Route</option>
                          {busRoutes.map((route) => (
                            <option key={route._id} value={route.routeNumber}>
                              {route.startPoint} - {route.endPoint}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="routeNumber" className="form-label">
                          Time Slots
                        </label>
                        <select
                          className="form-select"
                          value={timeSlot}
                          onChange={handleTimeTemplate}
                        >
                          <option value="">Available Time Slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot._id} value={JSON.stringify(slot)}>
                              {slot.startTime} - {slot.endTime}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="routeNumber" className="form-label">
                          Booking Date
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="routeNumber" className="form-label">
                            Number of Adult
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={numberOfAdults}
                            onChange={(e) => setNumberOfAdults(e.target.value)}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="routeNumber" className="form-label">
                            Number of Childrens
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            value={numberOfChildren}
                            onChange={(e) =>
                              setNumberOfChildren(e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    {busDetails && (
                      <div
                        className="card h-100 p-4"
                        style={{
                          backgroundColor: "#ECECEB",
                          border: "1px solid #BFBFBA",
                        }}
                      >
                        <img
                          src={busDetails.img}
                          alt={`Bus ${selectedBus} Image`}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            {selectedBus}
                          </h5>
                          <p
                            style={{ lineHeight: "12px" }}
                            className="card-text mt-3"
                          >
                            Passangers: {busDetails.passengersCapacity}
                          </p>
                          <p
                            style={{ lineHeight: "12px" }}
                            className="card-text"
                          >
                            Brand: {busDetails.brand}
                          </p>
                          <p
                            style={{ lineHeight: "12px" }}
                            className="card-text"
                          >
                            Bus Type:{" "}
                            {busDetails.busType === "AC" ? "AC" : "Non-AC"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <MDBBtn
                    color="dark"
                    size="lg"
                    className="shadow-0"
                    outline
                    onClick={getAllCurrentBookings}
                  >
                    Confirm Bus
                  </MDBBtn>
                </div>
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4 ">
                    <div style={{ paddingTop: "25%" }}>
                      {/*                                      
                                        <div class="bus-seat-row">
                                            <div class="seat">1</div>
                                            <div class="seat">2</div>
                                            <div class="seat-gap"></div>
                                            <div class="seat">3</div>
                                            <div class="seat">4</div>
                                            <div class="seat">5</div>
                                        </div> */}

                      {numRows > 0 && (
                        <div class="bus-seat-row mt-3 mb-4">
                          <div class="seat"></div>
                          <div class="seat"></div>
                          <div class="seat"></div>
                          <div class="seat"></div>
                          <div class="seat"></div>
                          <div class="seat">
                            <img
                              src={`../img/driver_seat.png`}
                              alt="driver seat"
                              style={{ width: "55px" }}
                              className="seat-photo"
                            />
                          </div>
                        </div>
                      )}

                      {Array.from({ length: numRows }, (_, rowIndex) => (
                        <div key={rowIndex} className="bus-seat-row mt-3">
                          {seats
                            .slice(rowIndex * 6, rowIndex * 6 + 6)
                            .map((seat) => (
                              <div
                                key={seat.id}
                                className={`seat ${seat.type} ${
                                  selectedSeats.includes(seat.id)
                                    ? "booked"
                                    : ""
                                }`}
                                onClick={() => {
                                  if (
                                    [3, 9, 15, 21, 27, 33, 39, 45].includes(
                                      seat.id
                                    )
                                  ) {
                                    // Do nothing for walking area seats
                                    return;
                                  }
                                  handleSeatClick(seat.id);
                                }}
                                style={{
                                  pointerEvents:
                                    seat.type === "alreadybooked"
                                      ? "none"
                                      : "auto",
                                }}
                                title={
                                  seat.type === "alreadybooked"
                                    ? "This seat is already booked."
                                    : "This seat is available."
                                }
                              >
                                {seat.id == 3 ||
                                seat.id == 9 ||
                                seat.id == 15 ||
                                seat.id == 21 ||
                                seat.id == 27 ||
                                seat.id == 33 ||
                                seat.id == 39 ||
                                seat.id == 45 ? (
                                  <div className="walking-area"></div>
                                ) : (
                                  <img
                                    src="../img/seat.png"
                                    alt="bus seat"
                                    style={{ width: "45px" }}
                                    className="seat-photo"
                                  />
                                )}
                              </div>
                            ))}
                        </div>
                      ))}

                      {numRows > 0 && (
                        <div class="bus-seat-row mt-3">
                          <div class="seat" onClick={() => handleSeatClick(51)}>
                            <img
                              src={`../img/seat.png`}
                              alt="bus seat"
                              style={{ width: "45px" }}
                              className="seat-photo"
                            />
                          </div>
                          <div class="seat" onClick={() => handleSeatClick(52)}>
                            <img
                              src={`../img/seat.png`}
                              alt="bus seat"
                              style={{ width: "45px" }}
                              className="seat-photo"
                            />
                          </div>
                          <div class="seat" onClick={() => handleSeatClick(53)}>
                            <img
                              src={`../img/seat.png`}
                              alt="bus seat"
                              style={{ width: "45px" }}
                              className="seat-photo"
                            />
                          </div>
                          <div class="seat" onClick={() => handleSeatClick(54)}>
                            <img
                              src={`../img/seat.png`}
                              alt="bus seat"
                              style={{ width: "45px" }}
                              className="seat-photo"
                            />
                          </div>
                          <div class="seat" onClick={() => handleSeatClick(55)}>
                            <img
                              src={`../img/seat.png`}
                              alt="bus seat"
                              style={{ width: "45px" }}
                              className="seat-photo"
                            />
                          </div>
                          <div class="seat" onClick={() => handleSeatClick(56)}>
                            <img
                              src={`../img/seat.png`}
                              alt="bus seat"
                              style={{ width: "45px" }}
                              className="seat-photo"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-5 text-center">
                      <MDBBtn
                        color="dark"
                        size="lg"
                        className="shadow-0"
                        outline
                        onClick={get_ticket_price}
                      >
                        Calculate Ticket Price
                      </MDBBtn>
                    </div>
                    <div className="mt-5 text-center mb-5">
                      <h2 className="mt-5 fw-bold">
                        TOTAL PRICE : RS. {tPrice}
                      </h2>
                    </div>
                  </div>
                  <div className="col-4"></div>
                </div>
                <hr />
                <div className="text-center mt-5">
                  <div className="row mt-3">
                    <div className="col-4"></div>
                    <div className="col-4">
                      <div className="card">
                        <hr />
                        <div className="mt-5">
                          <p className="fw-bold  text-uppercase">Do Payments</p>
                        </div>
                        <PayPalCheckout
                          userId={userID}
                          cost={tPrice}
                          bookingId={bookingId}
                          bookingType={paymentFor}
                        />
                      </div>
                    </div>
                    <div className="col-4"></div>
                  </div>
                </div>
                <br></br>
                <div className="text-center">
                  <MDBBtn color="success" size="lg" onClick={booking_complete}>
                    Booking Complete
                  </MDBBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BookingTicket;
