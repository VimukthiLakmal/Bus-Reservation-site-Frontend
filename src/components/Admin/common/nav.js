import React, { useState, useEffect } from "react";
import "../../../App.css";
import { MDBIcon } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

function NavBar() {
  function logout() {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  }

  // useEffect(() => {
  //     if(Cookies.get('login_status') == "logged"){

  //     }else{
  //         window.location.href = "/";
  //     }
  // },[]);

  function main_dashboard() {
    window.location.href = "/admin/dashboard";
  }

  return (
    <div>
      <header>
        <nav
          id="sidebarMenu"
          className="collapse d-lg-block sidebar collapse bg-white"
        >
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <a
                href={() => false}
                style={{ cursor: "pointer" }}
                onClick={main_dashboard}
                className="list-group-item list-group-item-action py-2 ripple"
                aria-current="true"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Main dashboard</span>
              </a>

              <a
                href="/admin/bus"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Bus</span>
              </a>
              <a
                href="/admin/Route"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Route</span>
              </a>
              <a
                href="/admin/employee"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Employee</span>
              </a>
              <a
                href="/admin/AdminTrip"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Trips</span>
              </a>
              <a
                href="/admin/BookedTicket"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Booking</span>
              </a>
              <a
                href="/admin/Rate"
                className="list-group-item list-group-item-action py-2 ripple"
              >
                <MDBIcon fas icon="angle-right" />
                <span>&nbsp;&nbsp;Ratings</span>
              </a>
            </div>
          </div>
        </nav>
        <nav
          id="main-navbar"
          className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>

            <a className="navbar-brand text-uppercase" href={() => false}>
              <img src="./img/category.png" height="25" alt="" loading="lazy" />
              Dushan Travelers
            </a>

            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item me-3 me-lg-0" onClick={logout}>
                <a
                  className="nav-link"
                  href={() => false}
                  style={{ cursor: "pointer" }}
                >
                  <MDBIcon fas icon="sign-out-alt" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
