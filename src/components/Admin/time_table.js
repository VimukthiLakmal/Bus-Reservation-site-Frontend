import React, { useState, useEffect } from 'react';
import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
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

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [basicEditModal, setBasicEditModal] = useState(false);
    const toggleEditShow = () => setBasicEditModal(!basicEditModal);

    const [route, setRouteNumber] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [busNumber, setBus] = useState('');
    const [check_times, setCheckTime] = useState('');

    const [routeEdit, setRouteEdit] = useState('');
    const [busNumberEdit, setBusNumberEdit] = useState('');
    const [startTimeEdit, setStartTimeEdit] = useState('');
    const [endTimeEdit, setEndTimeEdit] = useState('');
    const [editId, setEditID] = useState('');

    const setRouteNumberEdit = (e) => {
        setRouteEdit(e.target.value);
    };

    const setBusEdit = (e) => {
        setBusNumberEdit(e.target.value);
    };

    const handleStartTimeChangeEdit = (e) => {
        setStartTimeEdit(e.target.value);
    };

    const handleEndTimeChangeEdit = (e) => {
        setEndTimeEdit(e.target.value);
    };

    const [busRoutes, setBusRoutes] = useState([]);
    const [busList, setBusList] = useState([]);
    const [busTimeTableData, setTimeTemplates] = useState([]);

   
    const fetchAllTimeTemplates = async () => {
        try {
        const response = await axios.get('http://localhost:5000/busTimeTemplate/getBusTimeTable');
        setTimeTemplates(response.data);
        } catch (error) {
        console.error('Error fetching time templates:', error);
        }
    };

    const fetchBusRouteData = async () => {
        try {
            const response = await fetch('http://localhost:5000/bus_route/getRoutes'); 
            const jsonData = await response.json();
            setBusRoutes(jsonData);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    const fetchPublicTransportBusList = async () => {
        try {
        const response = await fetch('http://localhost:5000/bus/getPublicTransportBuses'); // Replace with your server URL if different
        if (!response.ok) {
            throw new Error('Failed to fetch bus list');
        }
            const data = await response.json();
            setBusList(data.buses);
        } catch (error) {
            console.error('Error fetching bus list:', error);
        }
    };

    useEffect(() => {
        fetchBusRouteData();
        fetchPublicTransportBusList();
        fetchAllTimeTemplates();
    }, []); 
    
    function back(){
        window.location.href="/admin/dashboard";
    }

    const save = () => {
        const newBusTimeTable = {
          route: route,
          startTime: startTime,
          endTime: endTime,
          busNumber: busNumber,
        };
    
        axios
          .post('http://localhost:5000/busTimeTemplate/addBusTimeTable', newBusTimeTable)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Data saved successfully!',
            });
            clearValues();
            setBasicModal(!basicModal);
            fetchAllTimeTemplates();
          })
          .catch((error) => {
            console.error('Error saving data:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to save data',
            });
          });
    };

    const clearValues = () => {
        setRouteNumber('');
        setStartTime('');
        setEndTime('');
        setBus('');
    };
      
    const handleDelete = (id) => {
        Swal.fire({
          title: 'Delete Template',
          text: 'Are you sure you want to delete this template?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it',
          cancelButtonText: 'No, cancel',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            deleteTemplate(id);
          }
        });
    };

    const deleteTemplate = (id) => {
        axios.delete(`http://localhost:5000/busTimeTemplate/deleteBusTimeTable/${id}`)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The template has been deleted.',
            });
            fetchAllTimeTemplates();
          })
          .catch((error) => {
            console.error('Error deleting template:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete the template.',
            });
          });
    };
    
    const handleEdit = (row) => {
        setRouteEdit(row.route);
        setBusNumberEdit(row.busNumber);
        setStartTimeEdit(row.startTime);
        setEndTimeEdit(row.endTime);
        setEditID(row._id);
        setBasicEditModal(!basicEditModal);
    }; 

    const handleStartTimeChange = (e) => {
        const newStartTime = e.target.value;
        if (endTime && newStartTime >= endTime) {
          setEndTime('');
          setCheckTime('');
        }
        setStartTime(newStartTime);
    };
    
    const handleEndTimeChange = (e) => {
        const newEndTime = e.target.value;
        if (startTime && newEndTime <= startTime) {
          setCheckTime('End time must be greater than start time.');
        }else{
          setCheckTime('');
        }
        setEndTime(newEndTime);
    };
    
    function edit_action() {
        const updatedData = {
          startTime: startTimeEdit,
          endTime: endTimeEdit,
        };
      
        axios
          .put(`http://localhost:5000/busTimeTemplate/updateBusTimeTable/${editId}`, updatedData)
          .then((response) => {
            console.log('Bus time table entry updated successfully:', response.data);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Bus time table entry updated successfully.',
            });
            setBasicEditModal(!basicEditModal);
            fetchAllTimeTemplates();
          })
          .catch((error) => {
            console.error('Error updating bus time table entry:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update the bus time table entry.',
            });
          });
    }

  return (
    <>
    <NavBar/>
    <div style={{backgroundColor : '#E2E7E9'}}>
        <main style={{marginTop: "58px" , backgroundColor :'#D7DDDC'}}>
            <div class="container pt-5 pb-5">
                <div className='container'>
                    <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                    <p style={{fontSize:'18px' , lineHeight:'20px'}}>Bus Time Template Managing</p>
                    <hr/>
                    <div className='text-end'>
                        <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                        <button className='btn btn-dark ' onClick={toggleShow}>Add Time Template</button>
                    </div>
                    <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'  className='text-center'>Bus</th>
                                <th scope='col'  className='text-center'>Route</th>
                                <th scope='col'  className='text-center'>Start Time</th>
                                <th scope='col'  className='text-center'>End Time</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{ backgroundColor: 'white' }}>
                            {busTimeTableData.map((entry, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{entry.busNumber}</td>
                                    <td className='text-center'>{entry.route}</td>
                                    <td className='text-center'>{entry.startTime}</td>
                                    <td className='text-center'>{entry.endTime}</td>
                                    <td className='text-center'>
                                        <MDBIcon icon='edit'  className="btn btn-success shadow-0" onClick={() => handleEdit(entry)} />{' '}
                                        <MDBIcon icon='trash' className="btn btn-danger shadow-0"  onClick={() => handleDelete(entry._id)} />
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>

                    <MDBModal staticBackdrop show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                            <MDBModalTitle className='text-warning'>ADD NEW TIME TABLE</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='mb-3'>
                                    <label htmlFor='routeNumber' className='form-label'>Route Number</label>
                                    <select   className='form-select'
                                        value={route}
                                        onChange={(e) => setRouteNumber(e.target.value)}>
                                        <option value="">Bus Route</option>
                                        {busRoutes.map((route) => (
                                            <option key={route._id} value={route.routeNumber}>
                                            {route.startPoint} - {route.endPoint}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='routeNumber' className='form-label'>BUS</label>
                                    <select   className='form-select'
                                        value={busNumber}
                                        onChange={(e) => setBus(e.target.value)}>
                                        <option value="">Select Bus</option>
                                        {busList.map((bus) => (
                                            <option key={bus._id} value={bus.busNumber}>
                                                {bus.busNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='startPoint' className='form-label'>Start Time</label>
                                            <input type='time' className='form-control' id='startTime' name='startTime' required   value={startTime} onChange={handleStartTimeChange}/>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='endPoint' className='form-label'>End Time</label>
                                            <input type='time' className='form-control' id='endTime' name='endTime' required   value={endTime} onChange={handleEndTimeChange}/>
                                            <small className='text-danger'>{check_times}</small>
                                        </div>
                                    </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className='btn btn-success' onClick={save}>Save</MDBBtn>
                                <MDBBtn className='btn btn-danger' onClick={()=>setBasicModal(!basicModal)}>Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>

                    <MDBModal staticBackdrop show={basicEditModal} setShow={setBasicEditModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                            <MDBModalTitle className='text-warning'>EDIT TIME TABLE</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleEditShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='mb-3'>
                                    <label htmlFor='routeNumber' className='form-label'>Route Number</label>
                                    <select disabled  className='form-select'
                                        value={routeEdit}
                                        onChange={(e) => setRouteNumberEdit(e.target.value)}>
                                        <option value="">Bus Route</option>
                                        {busRoutes.map((route) => (
                                            <option key={route._id} value={route.routeNumber}>
                                            {route.startPoint} - {route.endPoint}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='routeNumber' className='form-label'>BUS</label>
                                    <select disabled  className='form-select'
                                        value={busNumberEdit}
                                        onChange={(e) => setBusEdit(e.target.value)}>
                                        <option value="">Select Bus</option>
                                        {busList.map((bus) => (
                                            <option key={bus._id} value={bus.busNumber}>
                                                {bus.busNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='startPoint' className='form-label'>Start Time</label>
                                            <input type='time' className='form-control' id='startTime' name='startTime' required   value={startTimeEdit} onChange={handleStartTimeChangeEdit}/>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='endPoint' className='form-label'>End Time</label>
                                            <input type='time' className='form-control' id='endTime' name='endTime' required   value={endTimeEdit} onChange={handleEndTimeChangeEdit}/>
                                            <small className='text-danger'>{check_times}</small>
                                        </div>
                                    </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className='btn btn-success' onClick={edit_action}>Edit</MDBBtn>
                                <MDBBtn className='btn btn-danger' onClick={()=>setBasicEditModal(!basicEditModal)}>Cancel</MDBBtn>
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


