import React, { useState, useEffect } from "react";
import { MDBBtn } from "mdb-react-ui-kit";
import NavBar from "./common/after_login";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import PayPalCheckout from "./PayPalCheckout";

function CusTrip() {
  const [startDestination, setstartDestination] = useState("");
  const [endDestination, setendDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participants, setParticipants] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactPersonTelephone, setContactPersonTelephone] = useState("");
  const [discount, setDiscount] = useState("");
  const [cost, setCost] = useState(0);
  const [bus, setBus] = useState("");
  const [distance, setDistance] = useState("0");
  const [available_status, setAvailableStatus] = useState("");
  const [availableStatusColor, setAvailableStatusColor] = useState("");
  const [btn_disabled_Status, setBtnDisabledStatus] = useState(true);
  const [busProfileData, setBusProfileData] = useState({});
  const [displayStatus, setDisplayStaus] = useState("none");
  const [paymentFor, setpaymentFor] = useState("trip");

  const [price_per_km, setPricePerKm] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  const [extraPricePerDay, setExtraPricePerDay] = useState(0);
  const [userID, setUserID] = useState(0);
  const [bookingId, setBookingID] = useState(0);

  const [busesList, setBusesList] = useState([]);
  useEffect(() => {
    fetchBuses();
    fetchPriceListForTrip();
    var userDate = Cookies.get("profile");
    var user_json = JSON.parse(userDate);
    setUserID(user_json["userId"]);
  }, []);

  const fetchPriceListForTrip = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tripPriceMaster/getPricePlan"
      );
      console.log(response.data[0]);
      setPricePerKm(response.data[0].km_per_rs);
      setInitialPrice(response.data[0].initial_price);
      setExtraPricePerDay(response.data[0].extra_price_per_day);
    } catch (error) {
      console.error("Error fetching price list:", error);
      // Handle the error or show an error message to the user
      return null;
    }
  };

  const fetchBuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bus/getBuses");
      const allBuses = response.data;
      const specialBuses = allBuses.filter((bus) => bus.busPurpose === "sp");

      setBusesList(specialBuses);
    } catch (error) {
      console.error("Error fetching buses:", error);
    }
  };

  const apiKey = "AIzaSyAxzBb8xce96i_cOoWk58lPpFoO_pvyeB0";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const checkDatesAreSame = () => {
    // Convert the strings to JavaScript Date objects
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Compare the dates
    if (startDateObj.toDateString() === endDateObj.toDateString()) {
      return true; // Dates are the same
    } else {
      return false; // Dates are different
    }
  };

  const calNumberOFTripDays = () => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    const timeDifference = endDateObj.getTime() - startDateObj.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    const numberOfDays = daysDifference + 1;
    return numberOfDays;
  };

  const handleCalculateDistance = () => {
    if (startDestination.trim() === "" || endDestination.trim() === "") {
      return;
    }

    const formattedStart = encodeURIComponent(startDestination);
    const formattedEnd = encodeURIComponent(endDestination);

    axios
      .get(
        proxyurl +
          `https://maps.googleapis.com/maps/api/directions/json?origin=${formattedStart}&destination=${formattedEnd}&key=${apiKey}`
      )
      .then((response) => {
        if (
          response.data.routes &&
          response.data.routes.length > 0 &&
          response.data.routes[0].legs &&
          response.data.routes[0].legs.length > 0
        ) {
          const distanceInMeters =
            response.data.routes[0].legs[0].distance.value;
          const distanceInKilometers = distanceInMeters / 1000;
          setDistance(distanceInKilometers.toFixed(2) * 2);
          if (checkDatesAreSame()) {
            setCost(
              initialPrice + distanceInKilometers.toFixed(2) * 2 * price_per_km
            );
          } else {
            const numberOfDays = calNumberOFTripDays();
            setCost(
              initialPrice +
                distanceInKilometers.toFixed(2) * 2 * price_per_km +
                numberOfDays * extraPricePerDay
            );
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching distance:", error);
      });
  };

  async function save() {
    const formData = {
      customerId: userID,
      destination: startDestination + " - " + endDestination,
      startDate: startDate,
      endDate: endDate,
      participants: participants,
      contactPerson: contactPerson,
      telphoneContact: contactPersonTelephone,
      discount: discount,
      buNumber: bus,
      specifications: "noe",
      price: cost,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/trip/addTrips",
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Trip saved successfully!",
      });
      setBookingID(response.data._id);
      console.log(response.data);

      setDisplayStaus("inline");
    } catch (error) {
      console.error("Error sending data:", error);

      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to save trip data. Please try again later.",
      });
    }
  }

  async function preview_cost() {
    await handleCalculateDistance();
  }

  const check_bus_avalability = () => {
    if (bus.trim() === "" || startDate.trim() === "" || endDate.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please fill in all fields.",
      });
      return;
    }

    // Make a POST request to check bus availability
    axios
      .post("http://localhost:5000/trip/busAvailabilityCheck", {
        busNumber: bus,
        startDate: startDate,
        endDate: endDate,
      })
      .then((response) => {
        // Handle success
        if (response.data.status) {
          setAvailableStatusColor("red");
          setBtnDisabledStatus(true);
        } else {
          setAvailableStatusColor("green");
          setBtnDisabledStatus(false);
        }
        setAvailableStatus(response.data.message);
      })
      .catch((error) => {
        // Handle error
        setAvailableStatus("System Error!");
        setAvailableStatusColor("red");
        console.error("Error checking bus availability:", error);
        setBtnDisabledStatus(true);
      });
  };

  const handleBusSelect = (e) => {
    const selectedBusNumber = e.target.value;
    setBus(selectedBusNumber);
    axios
      .get(
        `http://localhost:5000/bus/getBusDataFromBusNumber/${selectedBusNumber}`
      )
      .then((response) => {
        const busData = response.data;
        setBusProfileData(busData);
      })
      .catch((error) => {
        console.error("Error fetching bus data:", error);
      });
  };

  function back() {
    window.location.href = "../passanger/PassangerDashboard";
  }
  return (
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
          <div className="row">
            <div
              className="col-7 rounded p-3"
              style={{ backgroundColor: "white" }}
            >
              <div className="row mt-3">
                <div className="col">
                  <label>Bus Number</label>
                  <select
                    className="form-select"
                    style={{ backgroundColor: "#E7E7DB" }}
                    value={bus}
                    onChange={handleBusSelect}
                  >
                    <option value="">Select Bus</option>
                    {busesList.map((bus) => (
                      <option key={bus.busNumber} value={bus.busNumber}>
                        {bus.busNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col"></div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label>Start Date</label>
                  <input
                    min={new Date().toISOString().split("T")[0]}
                    type="date"
                    className="form-control"
                    style={{ backgroundColor: "#E7E7DB" }}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="col">
                  <label>End Date</label>
                  <input
                    min={new Date().toISOString().split("T")[0]}
                    type="date"
                    className="form-control"
                    style={{ backgroundColor: "#E7E7DB" }}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-2 text-end">
                <MDBBtn
                  color="warning"
                  className="shadow-0"
                  size="sm"
                  onClick={check_bus_avalability}
                >
                  {" "}
                  Bus Availability Check{" "}
                </MDBBtn>
              </div>

              <div className="text-center">
                <h3 style={{ color: availableStatusColor }}>
                  {available_status}
                </h3>
              </div>
              <hr />
              <div className="row" style={{ paddingTop: "3%" }}>
                <div className="col mt-3">
                  <label>Start Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={startDestination}
                    onChange={(e) => setstartDestination(e.target.value)}
                  />
                </div>
                <div className="col mt-3">
                  <label>End Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={endDestination}
                    onChange={(e) => setendDestination(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-3">
                  <label>Participants</label>
                  <input
                    type="number"
                    className="form-control"
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                  />
                </div>
                <div className="col-9">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3" style={{ paddingBottom: "6%" }}>
                <div className="col-6">
                  <label>Telephone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={contactPersonTelephone}
                    onChange={(e) => setContactPersonTelephone(e.target.value)}
                  />
                </div>
                <div className="col-6" style={{ paddingBottom: "6%" }}>
                  <label>Discount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
                <div className="col-6" style={{ paddingBottom: "6%" }}>
                <label>
          <input
            type="radio"
            value="fixed"
          />
          Additional Lights
        </label>
                </div>
                <div className="col-6" style={{ paddingBottom: "6%" }}>
                <label>
          <input
            type="radio"
            value="fixed"
          />
          Additional Sounds
        </label>
                </div>
                <div className="text-end mt-4">
                  <MDBBtn
                    color="dark"
                    onClick={preview_cost}
                    disabled={btn_disabled_Status}
                  >
                    Preview Cost
                  </MDBBtn>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <div className="text-center mt-5">
                    <h1 style={{ fontWeight: "600", fontSize: "50px" }}>
                      {distance} KM
                    </h1>
                    <p className="fw-bold text-uppercase">
                      Total Traveling Distance
                    </p>
                  </div>
                </div>
                <div className="col">
                  <div className="text-center mt-5">
                    <h1 style={{ fontWeight: "600", fontSize: "50px" }}>
                      RS.{cost.toFixed(2)}
                    </h1>
                    <p className="fw-bold  text-uppercase">Trip Cost</p>
                  </div>
                </div>
              </div>

              <div class="alert alert-success" role="alert">
              As an advance you have to pay only 5000 rupees.
</div>

              <div className="row mt-3">
                <div className="col-2"></div>
                <div className="col-8">
                  <div className="card">
                    <div className="mt-5">
                      <p className="fw-bold  text-uppercase">Do Payments</p>
                    </div>

                    <PayPalCheckout
                      userId={userID}
                      cost={cost}
                      bookingId={bookingId}
                      bookingType={paymentFor}
                    />
                  </div>
                </div>
                <div className="col-2"></div>
              </div>

              <div className="text-center mt-4 mb-5">
                <MDBBtn
                  color="dark"
                  disabled={btn_disabled_Status}
                  onClick={save}
                >
                  Submit
                </MDBBtn>
              </div>
              <hr />
            </div>
            <div className="col-1"></div>
            <div
              className="col-4 rounded p-3"
              style={{ backgroundColor: "white" }}
            >
              {Object.keys(busProfileData).length !== 0 ? (
                <>
                  <img
                    src={busProfileData.img}
                    alt={`Bus ${busProfileData.busNumber} Image`}
                    className="card-img-top"
                  />
                  <div className="text-center mb-4 mt-2">
                    <h4>{busProfileData.busNumber}</h4>
                  </div>
                  <p style={{ lineHeight: "14px" }}>
                    <b>Brand:</b> {busProfileData.brand}
                  </p>
                  <p style={{ lineHeight: "14px" }}>
                    <b>Passengers Capacity:</b>{" "}
                    {busProfileData.passengersCapacity}
                  </p>
                  <p style={{ lineHeight: "14px" }}>
                    <b>Bus Type:</b>{" "}
                    {busProfileData.busType === "AC" ? "AC" : "Non-AC"}
                  </p>
                  <p style={{ lineHeight: "14px" }}>
                    <b>KM per Liter:</b> {busProfileData.kmPerL}
                  </p>
                  <p style={{ lineHeight: "14px" }}>
                    <b>Bus Purpose:</b>{" "}
                    {busProfileData.busPurpose === "sp"
                      ? "Special Tour"
                      : "Public Transport"}
                  </p>
                </>
              ) : (
                <p>No bus data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CusTrip;
