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
import NavBar from "./common/nav";
import ReactQuill from "react-quill";

import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function BookedTicket() {
  function back() {
    window.location.href = "/admin/dashboard";
  }

  const [ticketList, setTicketList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/ticketBooking/getBookings"
      ); // Replace 'your_api_endpoint' with the actual API endpoint to fetch data from
      const jsonData = await response.json();
      setTicketList(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function view(booking) {
    const [adults, children] = booking.passengers.split(",");

    const htmlContent = `
      <div class='text-start'>
        <p><b>Customer : </b> ${booking.customerId}</p>
        <p style='line-height:18px;'><b>Bus : </b> ${booking.bus}</p>
        <p style='line-height:18px;'><b>Date : </b> ${booking.bookingDate}</p>
        <p style='line-height:18px;'><b>Time Slot : </b> ${booking.timeSlot}</p>
        <p style='line-height:18px;'><b>Price : </b> RS.${booking.price}</p>
        <p style='line-height:18px;'><b>Passengers : </b> ${adults} Adults , ${children} Children</p>
        <p style='line-height:18px;'><b>Seats : </b> ${booking.seatNumbers} </p>
        <p style='line-height:18px;'><b>Status : </b> ${
          booking.status == "booked" ? "Booked" : "Canceled"
        } </p>
        
      </div>
    `;

    Swal.fire({
      title: "Booking Details",
      html: htmlContent,
      icon: "info",
      confirmButtonText: "Close",
    });
  }

  function cancel(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        status_update(id, "canceled");
      } else {
        console.log("Booking not canceled:", id);
      }
    });
  }

  function status_update(id, newStatus) {
    axios
      .put(`http://localhost:5000/ticketBooking/updateStatusBookings/${id}`, {
        status: newStatus,
      })
      .then((response) => {
        Swal.fire({
          title: "Booking Status Updated",
          text: "The booking status has been updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          fetchData();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Failed to update the booking status. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Failed to update booking status:", error);
      });
  }

  return (
    <>
      <NavBar />
      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div class="container pt-5 pb-5">
            <div className="container">
              <h4 className="text-uppercase " style={{ color: "black" }}>
                Admin Dashboard
              </h4>
              <p style={{ fontSize: "18px", lineHeight: "20px" }}>
                Ticket Booking Managing
              </p>
              <hr />
              <div className="text-end">
                <button className="btn btn-outline-dark" onClick={back}>
                  Back
                </button>
                &nbsp;
              </div>
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
                      Passengers
                    </th>
                    <th scope="col" className="text-center">
                      Status
                    </th>
                    <th scope="col" className="text-center">
                      Action
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: "white" }}>
                  {ticketList.map((booking) => {
                    // Split passengers into adults and children
                    const [adults, children] = booking.passengers.split(",");

                    return (
                      <tr key={booking.id}>
                        <td className="text-center">{booking.customerId}</td>
                        <td className="text-center">{booking.bus}</td>
                        <td className="text-center">{booking.bookingDate}</td>
                        <td className="text-center">{booking.timeSlot}</td>
                        <td className="text-center">{booking.price}</td>
                        <td className="text-center">
                          {adults} Adults
                          <br /> {children} Children
                        </td>
                        <td className="text-center">{booking.status}</td>
                        <td className="text-center">
                          <a
                            onClick={() => view(booking)}
                            className="btn btn-primary"
                          >
                            <MDBIcon far icon="eye" />
                          </a>{" "}
                          {booking.status !== "canceled" && (
                            <a
                              onClick={() => cancel(booking._id)}
                              className="btn btn-danger"
                            >
                              <MDBIcon fas icon="trash" />
                            </a>
                          )}
                        </td>
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

export default BookedTicket;
