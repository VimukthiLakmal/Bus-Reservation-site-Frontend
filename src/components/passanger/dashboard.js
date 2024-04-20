import React, { useState,useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Footer from "./common/footer";
import NavBar from "./common/after_login";
import MultipleLocationsMap from "./MultipleLocationsMap";
import axios from "axios";

function AdminDash() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [locations, setLocations] = useState([
    {
      name: "Colombo",
      latitude: 6.9271,
      longitude: 79.8612,
    },
  ]);
  function trips_action() {
    window.location.href = "../passanger/PassangerTrip";
  }

  function PassangerBookTicket() {
    window.location.href = "../passanger/PassangerBookTicket";
  }

  function histroy() {
    window.location.href = "../passanger/History";
  }

  function rating() {
    window.location.href = "../passanger/Rate";
  }
  const fetchData2 = async () => {
    await axios
      .get("http://localhost:5000/bus/getLocations")
      .then((res) => {
        setLocations(res.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData2();
  }, []);

  return (
    <div style={{ backgroundColor: "#E2E7E9" }}>
      <NavBar />

      <div class="container pt-5">
        <div className="container" style={{ paddingTop: "5%" }}>
          <MDBRow
            className="pt-5 pb-5"
            style={{ backgroundColor: "black", borderRadius: "32px" }}
          >
            <MDBCol sm="7">
              <MDBCard class="bg-transparent">
                <MDBCardBody style={{ paddingTop: "15%", paddingLeft: "15%" }}>
                  <MDBCardTitle
                    className="text-warning text-uppercase"
                    style={{
                      fontSize: "50px",
                      letterSpacing: "2px",
                      fontWeight: "600",
                    }}
                  >
                    Customer Dashboard
                  </MDBCardTitle>
                  <h4
                    className=" fw-light"
                    style={{ color: "#EAEAE9", letterSpacing: "15px" }}
                  >
                    DUSHAN TRAVELERS
                  </h4>
                  <br />
                  <hr />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="5">
              <MDBCard class="bg-transparent text-end">
                <img src="../img/customers.png" style={{ width: "87%" }} />
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <hr />
          <br />
          <div className="bg-white p-3 rounded mb-5">
            <h4>Live Bus Locations</h4>
            <hr />
            {locations ? (<MultipleLocationsMap locations={locations} />) : (<div></div>)}
          </div>
          <MDBRow className="pb-5">
            <MDBCol
              sm="4"
              className="mt-4"
              style={{ cursor: "pointer" }}
              onClick={trips_action}
            >
              <MDBCard>
                <MDBCardBody className="text-center p-4">
                  <br />
                  <img src="../img/baggages.png" style={{ width: "43%" }} />
                  <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                    TRIPS{" "}
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
              <MDBCard onClick={PassangerBookTicket}>
                <MDBCardBody className="text-center p-4">
                  <br />
                  <img src="../img/ticket.png" style={{ width: "43%" }} />
                  <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                    BOOKING{" "}
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
              <MDBCard onClick={histroy}>
                <MDBCardBody className="text-center p-4">
                  <br />
                  <img
                    src="../img/history_booking.png"
                    style={{ width: "43%" }}
                  />
                  <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                    History
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
              <MDBCard onClick={rating}>
                <MDBCardBody className="text-center p-4">
                  <br />
                  <img src="../img/feedbacks.png" style={{ width: "43%" }} />
                  <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                    Feedbacks
                  </MDBCardTitle>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminDash;
