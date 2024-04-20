import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import NavBar from "./common/nav";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import MultipleLocationsMap from "./MultipleLocationsMap";

function AdminDash() {
 
  const apiKey = "AIzaSyAxzBb8xce96i_cOoWk58lPpFoO_pvyeB0";

  function bus() {
    window.location.href = "../admin/bus";
  }

  function employee() {
    window.location.href = "../admin/employee";
  }

  function route() {
    window.location.href = "../admin/Route";
  }

  function busTicket() {
    window.location.href = "../admin/BusTicketMaster";
  }

  function BusTimeTable() {
    window.location.href = "../admin/BusTimeTable";
  }

  function booking() {
    window.location.href = "../admin/BookedTicket";
  }

  function rating() {
    window.location.href = "../admin/Rate";
  }
  const [busdata, setBusData] = useState([]);
  const[locations,setLocations]= useState([ {
    name: "Colombo",
    latitude: 6.9271,
    longitude: 79.8612,
  }]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/bus/getBuses");
      const jsonData = await response.json();
      setBusData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
      await axios.get("http://localhost:5000/bus/getLocations").then((res) => {
        setLocations(res.data);
      }).catch((error)=>console.error("Error fetching data:", error))

  };

  useEffect(() => {
  
    fetchData2();
  }, []);

  function trip() {
    window.location.href = "../admin/AdminTrip";
  }

  return (
    <>
      <NavBar />

      <div style={{ backgroundColor: "#E2E7E9" }}>
        <main style={{ marginTop: "58px", backgroundColor: "#D7DDDC" }}>
          <div class="container pt-5">
            <div className="container">
              <h4 className="text-uppercase">Admin Dashboard</h4>
              <hr />
              <br />
              <div className="bg-white p-3 rounded mb-5">
                <h4>Live Bus Locations</h4>
                <hr />
                {locations ? (<MultipleLocationsMap locations={locations} />) : (<div></div>)}
              </div>
              <MDBRow className="pb-5">
                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={bus}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img
                        src="../img/bus-school.png"
                        style={{ width: "43%" }}
                      />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        BUS{" "}
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={route}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src="../img/route.png" style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        ROUTES{" "}
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={employee}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src="../img/employee.png" style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        EMPLOYEE{" "}
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={trip}>
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
                  <MDBCard onClick={booking}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src="../img/booking.png" style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        BOOKING{" "}
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={busTicket}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img src="../img/ticket.png" style={{ width: "43%" }} />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Ticket Master{" "}
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={BusTimeTable}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img
                        src="../img/time_tables.png"
                        style={{ width: "43%" }}
                      />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Time Tables{" "}
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol sm="4" className="mt-4" style={{ cursor: "pointer" }}>
                  <MDBCard onClick={rating}>
                    <MDBCardBody className="text-center p-4">
                      <br />
                      <img
                        src="../img/feedbacks.png"
                        style={{ width: "43%" }}
                      />
                      <MDBCardTitle tag="h2" className="pt-4 text-uppercase">
                        Feedbacks
                      </MDBCardTitle>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDash;
