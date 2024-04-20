import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput,
  MDBTable,
  MDBTableHead,
  MDBIcon,
  MDBTableBody,
} from "mdb-react-ui-kit";
import NavBar from "./common/after_login";
import ReactQuill from "react-quill";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


function Ratings() {
  function back() {
    window.location.href = "../passanger/PassangerDashboard";
  }

  const [ticketList, setTicketList] = useState([]);
  const [tripList, setTripList] = useState([]);
  const [userID, setUserID] = useState(0);
  const fetchData = async (userID) => {
    try {
      const response = await fetch(
        "http://localhost:5000/ticketBooking/getBooking/" + userID
      );
      const jsonData = await response.json();
      setTicketList(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await fetch("http://localhost:5000/trip/trip/" + userID);
      const jsonData = await response.json();
      setTripList(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    var userDate = Cookies.get("profile");
    var user_json = JSON.parse(userDate);
    setUserID(user_json["userId"]);
    fetchData(user_json["userId"]);
  }, []);


  const Rates = ({ id, rating }) => {
    const handleRatingChange = (rate) => {
      axios.put('http://localhost:5000/ticketBooking/updateBookings/ratings/'+id, {rating:rate})
      .then(() => {
        fetchData(userID)
      })
      .catch((error) => {
        console.error('Error updating resource:', error);
      });
    };
  
    return <Rating onClick={handleRatingChange} initialValue={rating} />;
  };

  const Rates1 = ({ id, rating }) => {
    const handleRatingChange = (rate) => {
      axios.put('http://localhost:5000/trip/trips/ratings/'+id, {rating:rate})
      .then(() => {
        fetchData(userID)
      })
      .catch((error) => {
        console.error('Error updating resource:', error);
      });
    };
  
    return <Rating onClick={handleRatingChange} initialValue={rating} />;
  };

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div className="container pt-5 pb-5">
            <div className="container">
              <h4 className="text-uppercase " style={{ color: "black" }}>
                CUSTOMER DASHBOARD
              </h4>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "20px",
                  marginTop: "10px",
                }}
              >
                Ratings
              </p>
              <hr />
              <div className="text-end">
                <button className="btn btn-outline-dark" onClick={back}>
                  Back
                </button>
                &nbsp;
              </div>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "20px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Bookings
              </p>
              <MDBTable className="mt-4">
                <MDBTableHead dark>
                  <tr>
                    <th scope="col" className="text-center">
                      Customer
                    </th>
                    <th scope="col" className="text-center">
                      Bus
                    </th>
                    <th scope="col" className="text-center">
                      Date
                    </th>
                    <th scope="col" className="text-center">
                      Time Slot
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                    <th scope="col" className="text-center">
                      Rating
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: "white" }}>
                  {ticketList.map((booking) => {
                    // Split passengers into adults and children
                    const [adults, children] = booking.passengers.split(",");

                    return (
                      <tr key={booking._id}>
                        <td className="text-center">{booking.customerId}</td>
                        <td className="text-center">{booking.bus}</td>
                        <td className="text-center">{booking.bookingDate}</td>
                        <td className="text-center">{booking.timeSlot}</td>
                        <td className="text-center">{booking.price}</td>
                        <td className="text-center">
                          <Rates id={booking._id} rating={booking.rating} />
                        </td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "20px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Trips
              </p>
              <MDBTable className="mt-8 ">
                <MDBTableHead dark>
                  <tr>
                    <th scope="col" className="text-center">
                      Destination
                    </th>
                    <th scope="col" className="text-center">
                      Start Date
                    </th>
                    <th scope="col" className="text-center">
                      End Date
                    </th>
                    <th scope="col" className="text-center">
                      Participants
                    </th>
                    <th scope="col" className="text-center">
                      Price
                    </th>
                    <th scope="col" className="text-center">
                      Rating
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: "white" }}>
                  {tripList.map((booking) => {
                    return (
                      <tr key={booking._id}>
                        <td className="text-center">{booking.destination}</td>
                        <td className="text-center">{booking.startDate}</td>
                        <td className="text-center">{booking.endDate}</td>
                        <td className="text-center">{booking.participants}</td>
                        <td className="text-center">{booking.price}</td>
                        <td className="text-center"> <Rates1 id={booking._id} rating={booking.rating} /></td>
                      </tr>
                    );
                  })}
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Ratings;
