import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBTable,
    MDBTableHead,
    MDBIcon,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
import NavBar from './common/nav';
import axios from 'axios';
import Swal from 'sweetalert2';

function BusRoute() {

    function back(){
        window.location.href="/admin/dashboard";
    }

    const [allTrips, setAllTrips] = useState([]);
    const fetchRoleData = async () => {
        try {
            const response = await fetch('http://localhost:5000/trip/trips'); 
            const jsonData = await response.json();
            setAllTrips(jsonData);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    function funDateConvert(dateStr){
        const formattedDate = new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        return formattedDate;
    }

    function viewDetails(data){
        Swal.fire({
            title: 'Trip Details',
            html: `<div class='text-start'><br/>
                <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
                <p><strong>Telephone Number:</strong> ${data.telphoneContact}</p>
                <p><strong>Destination:</strong> ${data.destination}</p>
                <p><strong>Duration:</strong> ${funDateConvert(data.startDate)} - ${funDateConvert(data.endDate)}</p>
                <p><strong>Participants:</strong> ${data.participants}</p>
                <p><strong>Ticket Fee:</strong> RS.${data.price}</p>
                <p><strong>Bus Number:</strong> ${data.buNumber}</p>
                <p><strong>Status:</strong> ${data.status === "booked" ? "Booked" : "Canceled"}</p>
                </div>
            `,
            confirmButtonText: 'OK',
        });
    }
    function cancelTrip(id) {
        // Show a confirmation dialog using SweetAlert
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to cancel this trip?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, cancel it!',
          cancelButtonText: 'No, keep it',
        }).then((result) => {
          // Check if the user clicked the confirm button
          if (result.isConfirmed) {
            fun_cancel(id , "canceled");
          }
        });
    }

    function complete(id){
        // Show a confirmation dialog using SweetAlert
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to complete this trip?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, complete it!',
            cancelButtonText: 'No, keep it',
        }).then((result) => {
            // Check if the user clicked the confirm button
            if (result.isConfirmed) {
             fun_cancel(id , "complete");
            }
        });
    }
    
    function fun_cancel(id , status) {
        axios
        .put(`http://localhost:5000/trip/updateTripStatus/${id}` , {
            status : status
        })
        .then((response) => {
            const { message, ticketBooking } = response.data;
    
            console.log(message); 
    
            Swal.fire({
                title: 'Success!',
                text: 'Ticket booking successfully canceled.',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            }).then(() => {
                fetchRoleData();
            });
        })
        .catch((error) => {
            console.error('Error canceling ticket booking:', error);
    
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while canceling the ticket booking.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
            });
        });
    }
      

    useEffect(() => {
        fetchRoleData();
    }, []); 

    return(
        <>
          <NavBar/>
            <div style={{backgroundColor : '#E2E7E9'}}>
                <main style={{marginTop: "58px" , backgroundColor :'#D7DDDC'}}>
                    <div class="container pt-5 pb-5">
                        <div className='container'>
                            <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                            <p style={{fontSize:'18px' , lineHeight:'20px'}}>Trip Request Managing</p>
                            <hr/>
                            <div className='text-end'>
                                <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                            </div>
                            <div class='mt-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <label>Contact Person Tel : </label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className='col'>

                                    </div>
                                </div>
                            </div>
                            <MDBTable className='mt-4'>
                                <MDBTableHead dark>
                                    <tr>
                                        <th scope='col'  className='text-center'>Dates</th>
                                        <th scope='col'  className='text-center'>Participants</th>
                                        <th scope='col' className='text-center'>Contact Person</th>
                                        <th scope='col' className='text-center'>Telephone Number</th>
                                        <th scope='col' className='text-center'>Bus Number</th>
                                        <th scope='col' className='text-center'>Staus</th>
                                        <th scope='col' className='text-center'>Action</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ backgroundColor: 'white' }}>
                                    {allTrips.map((trip) => (
                                        <tr key={trip.id}>
                                            <td>{funDateConvert(trip.startDate)} - {funDateConvert(trip.endDate)}</td>
                                            <td className='text-center'>{trip.participants} Persons</td>
                                            <td>{trip.contactPerson}</td>
                                            <td>{trip.telphoneContact}</td>
                                            <td>{trip.buNumber}</td>
                                            <td>{trip.status === "booked" ? "Booked" : (trip.status === "complete")? 'Complete': "Canceled"}</td>
                                            <td className='text-center'>
                                            {
                                                trip.status === "booked" && (
                                                    <MDBBtn
                                                    color="danger"
                                                    outline
                                                    size="sm"
                                                    className="shadow-0"
                                                    onClick={() => cancelTrip(trip._id)}
                                                    >
                                                    <MDBIcon fas icon="trash" />
                                                    </MDBBtn>
                                                )
                                            }{' '}
                                                <MDBBtn  color='success' outline size='sm' className='shadow-0' onClick={()=>viewDetails(trip)}><MDBIcon fas icon="eye" /></MDBBtn>{' '}
                                            {
                                                trip.status === "booked" && (
                                                <MDBBtn  color='success' outline size='sm' className='shadow-0' onClick={()=>complete(trip._id)}><MDBIcon fas icon="check" /></MDBBtn>
                                                )
                                            }{' '}
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default BusRoute;
