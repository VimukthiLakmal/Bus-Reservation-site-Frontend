import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import { MDBSpinner } from "mdb-react-ui-kit";

function BusLocation() {
  const [busNumber, setBusNumber] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleTrack = () => {
    const loginData = {
      number: busNumber,
    };
    setIsSubmitting(true);

    axios
      .post("http://localhost:5000/bus/buses/number", loginData)
      .then((response) => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "No data.",
        });

        setIsSubmitting(false);
        setIsLoggedIn(false);
      });
  };

  const fetchData = (latitude, longitude) => {
    let data = {
      number: busNumber,
      latitude: latitude,
      longitude: longitude,
    };

    axios
      .post("http://localhost:5000/bus/addLocations", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("API request error:", error);
      });
  };

  useEffect(() => {
    const myFunction = () => {
      if (isLoggedIn) {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchData(latitude, longitude);
            },
            (error) => {
              console.error("Error getting geolocation:", error);
            }
          );
        }
      }
    };
    const intervalId = setInterval(myFunction, 10000);
    return () => clearInterval(intervalId);
  }, [isLoggedIn]);

  const handleStop = () => {
    setIsSubmitting(false);
    setIsLoggedIn(false);
  };

  return (
    <div style={{ backgroundColor: "#CCCCB2" }}>
      <div
        className="container"
        style={{ paddingTop: "5%", paddingBottom: "10%" }}
      >
        <div className="row">
          <div className="col">
            <img src="../img/bus_p_reg.png" style={{ paddingTop: "30%" }} />
          </div>
          <div className="col">
            <div className="card">
              <div></div>
              <div className="card-body">
                <div>
                  <h3 className="text-center text-uppercase text-decoration-underline">
                    Location Tracker
                  </h3>
                </div>
                <div className="mb-3">
                  <label htmlFor="busNumber">Bus Number :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="busNumber"
                    name="busNumber"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="chassisNumber">Chassis Number :</label>
                  <input
                    type="text"
                    className="form-control"
                    id="chassisNumber"
                    name="chassisNumber"
                    value={chassisNumber}
                    onChange={(e) => setChassisNumber(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="text-center">
                  <div className="d-grid gap-2 col-12 mx-auto">
                    {isLoggedIn ? (
                      <div>
                        <MDBSpinner
                          grow
                          style={{ width: "3rem", height: "3rem" }}
                        ></MDBSpinner>
                        <br />
                        <span>Tracking...</span>
                        <br />
                        <br />
                        <MDBBtn
                          className="btn btn-dark shadow-0"
                          onClick={handleStop}
                        >
                          Stop
                        </MDBBtn>
                      </div>
                    ) : (
                      <MDBBtn
                        type="submit"
                        className="btn btn-dark shadow-0"
                        onClick={handleTrack}
                        disabled={isSubmitting}
                      >
                        Check
                      </MDBBtn>
                    )}
                  </div>
                </div>
                <hr style={{ marginTop: "10%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusLocation;
