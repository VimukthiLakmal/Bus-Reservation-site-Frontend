import React, { useState, useEffect } from 'react';
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
  } from 'mdb-react-ui-kit';
import NavBar from './common/nav';
import ReactQuill from 'react-quill';

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import 'react-quill/dist/quill.snow.css';

const richTextModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
};
  
const richTextFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
];

const editorStyle = { height: '300px'  };

function BusRoute() {

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [routeNumber, setRouteNumber] = useState('');
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');
    const [description, setDescription] = useState('');

    const [busRoutes, setBusRoutes] = useState([]);

    const fetchBusRouteData = async () => {
        try {
            const response = await fetch('http://localhost:5000/bus_route/getRoutes'); 
            const jsonData = await response.json();
            setBusRoutes(jsonData);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    useEffect(() => {
        fetchBusRouteData();
    }, []); 
    
    function back(){
        window.location.href="/admin/dashboard";
    }

    function save(){
        const newBusRoute = {
            routeNumber,
            startPoint,
            endPoint,
            description,
        };

        // Send a POST request to your backend to save the new bus route
        axios.post('http://localhost:5000/bus_route/addRoute', newBusRoute)
            .then((response) => {
                // Handle success, show a success message, and close the modal
                console.log('New bus route added:', response.data);
                setBasicModal(!basicModal);
                clearValues();
                fetchBusRouteData();

                // Show a success message using SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'New bus route has been added successfully!',
                });
            })
            .catch((error) => {
                // Handle error, show an error message, etc.
                console.error('Error adding new bus route:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to add new bus route. Please try again later.',
                });
            });
    }

    // Handler to update editor content when user types
    const handleEditorChange = (content) => {
        setDescription(content);
    };

    const clearValues = () => {
        setRouteNumber('');
        setStartPoint('');
        setEndPoint('');
        setDescription('');
    };

    function handleEditRoute(data) {
        
        let routeInfo = `<div class='text-start'><p><b>Bus Route Num:</b> ${data.routeNumber}</p>`;
        routeInfo += `<p><b>Route :</b> ${data.startPoint} - ${data.endPoint}</p>`;
        routeInfo += `<p> ${data.description}</p></div>`;
    
        // Display the bus route data using SweetAlert2 with HTML content
        Swal.fire({
          icon: 'info',
          title: 'Bus Route Information',
          html: routeInfo,
          confirmButtonText: 'Close'
        });
    }
      
    const handleDeleteRoute = (id) => {
        // Show a confirmation popup using SweetAlert2
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure?',
          text: 'You are about to delete this bus route. This action cannot be undone.',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            // If the user confirms, send a DELETE request to your backend API
            axios.delete(`http://localhost:5000/bus_route/deleteRoutes/${id}`)
              .then((response) => {
                // Handle success, show a success message, and update the table
                console.log('Bus route deleted:', response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Deleted!',
                  text: 'Bus route has been deleted successfully.',
                });
                fetchBusRouteData();

              })
              .catch((error) => {
                // Handle error, show an error message, etc.
                console.error('Error deleting bus route:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to delete bus route. Please try again later.',
                });
              });
          }
        });
    };    
    

  return (
    <>
    <NavBar/>
    <div style={{backgroundColor : '#E2E7E9'}}>
        <main style={{marginTop: "58px" , backgroundColor :'#D7DDDC'}}>
            <div class="container pt-5 pb-5">
                <div className='container'>
                    <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                    <p style={{fontSize:'18px' , lineHeight:'20px'}}>Bus Routes Managing</p>
                    <hr/>
                    <div className='text-end'>
                        <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                        <button className='btn btn-dark ' onClick={toggleShow}>Add Route</button>
                    </div>
                    <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'  className='text-center'>Route Name</th>
                                <th scope='col'  className='text-center'>Start Destination</th>
                                <th scope='col'  className='text-center'>End Destination</th>
                                <th scope='col'  className='text-center'>Status</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{ backgroundColor: 'white' }}>
                            {busRoutes.map((route) => (
                                <tr key={route._id}>
                                    <td className='text-center'>{route.routeNumber}</td>
                                    <td className='text-center'>{route.startPoint}</td>
                                    <td className='text-center'>{route.endPoint}</td>
                                    <td className='text-center'>{route.status ? 'Active' : 'Inactive'}</td>
                                    <td className='text-center'>
                                    <MDBBtn color='success' size='sm'  className='shadow-0'  outline  onClick={() => handleEditRoute(route)}><MDBIcon fas icon="eye" /></MDBBtn>{' '}
                                    <MDBBtn color='danger'  size='sm'  className='shadow-0' outline   onClick={() => handleDeleteRoute(route._id)}><MDBIcon fas icon="trash" /></MDBBtn>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>

                    <MDBModal staticBackdrop show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                            <MDBModalTitle className='text-warning'>ADD NEW BUS ROUTE</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='mb-3'>
                                    <label htmlFor='routeNumber' className='form-label'>Route Number</label>
                                    <input type='text' className='form-control' id='routeNumber' name='routeNumber' required  value={routeNumber} onChange={(e) => setRouteNumber(e.target.value)}/>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='startPoint' className='form-label'>Start Point</label>
                                            <input type='text' className='form-control' id='startPoint' name='startPoint' required   value={startPoint} onChange={(e) => setStartPoint(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='endPoint' className='form-label'>End Point</label>
                                            <input type='text' className='form-control' id='endPoint' name='endPoint' required   value={endPoint} onChange={(e) => setEndPoint(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className='mb-3'>
                                    <label htmlFor='description' className='form-label'>Description</label>
                                    <ReactQuill
                                        value={description}
                                        onChange={handleEditorChange}
                                        placeholder="Write something..."
                                        modules={richTextModules}
                                        formats={richTextFormats}
                                        style={editorStyle}
                                    />
                                </div>
                               
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className='btn btn-success' onClick={save}>Save</MDBBtn>
                                <MDBBtn className='btn btn-danger' onClick={()=>setBasicModal(!basicModal)}>Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </div>
            </div>
        </main>
    </div>
    </>
  );
}

export default BusRoute;


