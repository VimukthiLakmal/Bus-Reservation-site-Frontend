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
    MDBInput,
    MDBTable,
    MDBTableHead,
    MDBIcon,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
import NavBar from './common/nav';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PDFDocument, rgb } from 'pdf-lib';
import { Image } from 'cloudinary-react';


function BusManage() {

    const [busNumber, setBusNumber] = useState('');
    const [chassisNumber, setChassisNumber] = useState('');
    const [registeredDate, setRegisteredDate] = useState('');
    const [brand, setBrand] = useState('');
    const [passengersCapacity, setPassengersCapacity] = useState('');
    const [busType, setBusType] = useState('');
    const [kmPerL, setKmPerL] = useState('');
    const [busRoute, setBusRoute] = useState('');
    const [busPurpose, setBusPurpose] = useState('');
    const [check_chassi, setChassiNumber] = useState('');
    const [checkChassiColor, setChassiNumberColor] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [imgName, setImgName] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);


    const [editBusNumber, setEditBusNumber] = useState('');
    const [editChassisNumber, setEditChassisNumber] = useState('');
    const [editRegisteredDate, setEditRegisteredDate] = useState('');
    const [editBrand, setEditBrand] = useState('');
    const [editPassengersCapacity, setEditPassengersCapacity] = useState('');
    const [editBusType, setEditBusType] = useState('');
    const [editKmPerL, setEditKmPerL] = useState('');
    const [editBusRoute, setEditBusRoute] = useState('');
    const [editBusPurpose, setEditBusPurpose] = useState('');
    const [searchText, setSearchText] = useState('');

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [basicEditModal, setBasicEditModal] = useState(false);
    const toggleEditShow = () => setBasicEditModal(!basicEditModal);

    function back(){
        window.location.href="/admin/dashboard";
    }

    const clearValues = () => {
        setBusNumber('');
        setChassisNumber('');
        setRegisteredDate('');
        setBrand('');
        setPassengersCapacity('');
        setBusType('');
        setKmPerL('');
        setBusRoute('');
        setBusPurpose('');
    };

    function save(){

        const busData = {
            busNumber: busNumber,
            chassisNumber: chassisNumber,
            registeredDate: registeredDate,
            brand: brand,
            passengersCapacity: passengersCapacity,
            busType: busType,
            kmPerL: kmPerL,
            busRoute: busRoute,
            busPurpose: busPurpose,
            img:imgName
        };

        axios.post('http://localhost:5000/bus/Addbuses', busData)
        .then(response => {
            console.log('Data saved successfully:', response.data);

            // Display SweetAlert2 success message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data saved successfully!',
            });
            setBasicModal(!basicModal);
            clearValues();
            fetchData();
        })
        .catch(error => {
            console.error('Error saving data:', error);

            // Display SweetAlert2 error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error saving data. Please try again later.',
            });
        });
    }

    const handleChassisNumberChange = (e) => {
        const inputValue = e.target.value;
        const isValidChassisNumber = /^[A-Za-z0-9]{17}$/.test(inputValue);
        setChassisNumber(inputValue);
        
        if (isValidChassisNumber || inputValue === '') {
            setChassiNumber("Valid Chassi Number.");
            setChassiNumberColor("green");
        }else{
            setChassiNumber("Invalid Chassi Number.");
            setChassiNumberColor("red");
        }
      };

      const [busdata, setBusData] = useState([]);
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
  
     
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/bus/getBuses'); 
          const jsonData = await response.json();
          setBusData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      // Call the fetchData function once when the component mounts
      useEffect(() => {
        fetchData();
        fetchBusRouteData();
      }, []);


      function handleNotAvailable(id) {
        Swal.fire({
            title: 'Confirm Status Change',
            text: 'Are you sure you want to change the status?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, change status!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`http://localhost:5000/bus/statusChange/${id}`)
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Status Changed!',
                            text: 'The status has been changed.',
                        });
                        fetchData();
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'An error occurred while changing the status.',
                        });
                    });
            }
        });
    }
    

      function handleEdit(all_data){
        console.log(all_data);
        setBasicEditModal(!basicEditModal);
        setEditBusNumber(all_data.busNumber);
        setEditBusNumber(all_data.busNumber);
        setEditChassisNumber(all_data.chassisNumber);
        const formattedDate = new Date(all_data.registeredDate);
        setEditRegisteredDate(formattedDate);
        setEditBrand(all_data.brand);
        setEditPassengersCapacity(all_data.passengersCapacity);
        setEditBusType(all_data.busType);
        setEditKmPerL(all_data.kmPerL);
        setEditBusRoute(all_data.busRoute);
        setEditBusPurpose(all_data.busPurpose);
        
      }

      function handleView(data){
        const busData = data;
        const formattedData = `<div class='text-start'>
          <center><img style="width:100%" src="${busData.img}" /></center><br/>
          <p><strong>Bus Number: </strong>${busData.busNumber}</p>
          <p><strong>Chassis Number: </strong>${busData.chassisNumber}</p>
          <p><strong>Registered Date: </strong>${busData.registeredDate}</p>
          <p><strong>Brand: </strong>${busData.brand}</p>
          <p><strong>Passengers Capacity: </strong>${busData.passengersCapacity}</p>
          <p><strong>Bus Type: </strong>${busData.busType === 'ac' ? 'AC Bus' : 'Non-AC Bus'}</p>
          <p><strong>Km Per L: </strong>${busData.kmPerL}</p>
          <p><strong>Bus Route: </strong>${busData.busRoute}</p>
          <p><strong>Status: </strong>${busData.status === '1' ? 'Active' : 'Inactive'}</p>
          <p><strong>Bus Purpose: </strong>${busData.busPurpose === 'sp' ? 'Special Tour' : 'Public Transport'}</p>

        `;

        Swal.fire({
          icon: 'none',
          title: 'Bus Information',
          html: formattedData,
        });
      }

      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
      
        fetch('https://api.cloudinary.com/v1_1/dlppmkosi/image/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setImageURL(data.secure_url);
            setImgName(data.secure_url); // Set the image name to the state variable
            console.log(data.secure_url);
            setBtnDisable(false);
          })
          .catch((error) => console.error('Error uploading image:', error));
      };

      function handleDelete(id) {
        Swal.fire({
            title: 'Confirm Delete',
            text: 'Are you sure you want to delete this bus?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/bus/deleteBuses/${id}`)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The bus has been deleted.',
                    });
                    fetchData();
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while deleting the item.',
                    });
                });
            }
        });
      }

      async function pdf_generate() {
        try {
          const response = await axios.get('http://localhost:5000/bus/getBuses'); // Fetch bus data
          const busData = response.data;
      
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage();
          const { width, height } = page.getSize();
      
          const fontSize = 12;
          const lineHeight = fontSize * 1.5;
      
          const xStart = 50;
          const yStart = height - 50;
      
          page.drawText('Bus List', {
            x: xStart,
            y: yStart,
            size: fontSize + 2,
            color: rgb(0, 0, 0),
          });
      
          const tableHeaders = ['Bus Number', 'Chassis Number', 'Brand', 'Passengers Capacity', 'Bus Type'];
      
          let y = yStart - lineHeight;
      
          tableHeaders.forEach((header, columnIndex) => {
            page.drawText(header, {
              x: xStart + columnIndex * 120,
              y: y,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
          });
      
          y -= lineHeight * 1.5;
      
          busData.forEach((bus, rowIndex) => {
            const rowData = [
              bus.busNumber.toString(),
              bus.chassisNumber.toString(),
              bus.brand.toString(),
              bus.passengersCapacity.toString(),
              bus.busType.toString(),
            ];
      
            
            rowData.forEach((cellData, columnIndex) => {
              page.drawText(cellData, {
                x: xStart + columnIndex * 120,
                y: y,
                size: fontSize,
                color: rgb(0, 0, 0),
              });
            });
      
            y -= lineHeight;
          });
      
          const pdfBytes = await pdfDoc.save();
      
          // Convert PDF bytes to a Blob or download it directly
          const blob = new Blob([pdfBytes], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
      
          // Open the PDF in a new tab
          window.open(url);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while generating the PDF.',
          });
          console.error('Error generating PDF:', error);
        }
    }
      

    async function search_bus() {
        try {
          const response = await axios.get('http://localhost:5000/bus/searchUsingBusNumber/'+searchText);
          const searchData = response.data;
          if(searchData.buses !== false){
              setBusData(searchData.buses);
          }else{
             
              Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'There are no busses.',
              });
          }
        } catch (error) {
          console.error('Error searching buses:', error);
        }
    }
    
  return (
    <>
    <NavBar/>
    <div style={{backgroundColor : '#E2E7E9'}}>
        <main style={{marginTop: "58px" , backgroundColor :'#D7DDDC'}}>
            <div class="container pt-5 pb-5">
                <div className='container'>
                    <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                    <p style={{fontSize:'18px' , lineHeight:'20px'}}>Bus Managing</p>
                    <hr/>
                    <div className='text-end'>
                        <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                        <button className='btn btn-dark ' onClick={toggleShow}>Add Bus</button>&nbsp;
                        <button className='btn btn-dark ' onClick={pdf_generate}>PDF Generate</button>
                    </div>
                    <div className='bg-white p-3 rounded mt-4'>
                        <h5 className='text-uppercase'>Filter Data</h5>
                        <hr/>
                        <div className='row pb-3'>
                            <div className='col'>
                              <label>Bus Number</label>
                              <input type='text' className='form-control' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                            </div>
                            <div className='col'>
                              <br/>
                              <button className='btn btn-dark shadow-0' onClick={search_bus}>Seach</button>{' '}
                              <button className='btn btn-outline-dark shadow-0' onClick={fetchData}>Clear</button>
                            </div>
                        </div>
                    </div>
                    <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'  className='text-center'>Bus Number</th>
                                <th scope='col'  className='text-center'>Brand</th>
                                <th scope='col'  className='text-center'>Chasi Number</th>
                                <th scope='col'  className='text-center'>Passengers</th>
                                <th scope='col'  className='text-center'>Bus Type</th>
                                <th scope='col'  className='text-center'>Status</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{backgroundColor:'white'}}>
                            {busdata.map((item) => (
                            <tr key={item._id}>
                                <td className='text-center'>{item.busNumber}</td>
                                <td className='text-center'>{item.brand}</td>
                                <td className='text-center'>{item.chassisNumber}</td>
                                <td className='text-center'>{item.passengersCapacity}</td>
                                <td className='text-center'>
                                    {item.busType.toLowerCase() === 'ac' ? 'AC' : 'Non-AC'}
                                </td>
                                <td className='text-center'>
                                    {item.status === '1' ? 'Available' : 'Not Available'}
                                </td>
                                <td className='text-center'>
                                    
                                        <MDBBtn
                                            outline
                                            color='warning'
                                            className='shadow-0'
                                            onClick={() => handleNotAvailable(item._id)}
                                        >
                                          Status 
                                        </MDBBtn> {' '}
                                        <MDBBtn
                                            color='primary'
                                            outline
                                            className='shadow-0'
                                            onClick={() => handleEdit(item)}
                                        >
                                            <MDBIcon fas icon="pen" />
                                        </MDBBtn>{' '}
                                        <MDBBtn
                                            color='danger'
                                            outline
                                            className='shadow-0'
                                            onClick={() => handleDelete(item._id)}
                                        >
                                            <MDBIcon fas icon="trash" />
                                        </MDBBtn>{' '}
                                        <MDBBtn
                                            color='success'
                                            outline
                                            className='shadow-0'
                                            onClick={() => handleView(item)}
                                        >
                                            <MDBIcon fas icon="eye" />
                                        </MDBBtn>
                                </td>
                            </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                    <MDBModal staticBackdrop show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                            <MDBModalTitle className='text-warning'>ADD NEW BUS</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='mt-2'>
                                    <label>Bus Number</label>
                                    <input
                                        type="text"
                                        name="busNumber"
                                        className='form-control'
                                        required
                                        value={busNumber}
                                        onChange={(e) => setBusNumber(e.target.value)}
                                    />
                                </div>
                                
                                <div className='mt-3'>
                                    <label>Chassis Number</label>
                                    <input
                                        type="text"
                                        name="chassisNumber"
                                        className='form-control'
                                        required
                                        value={chassisNumber}
                                        onChange={handleChassisNumberChange}
                                    />
                                    <small style={{color:checkChassiColor}}>{check_chassi}</small>
                                </div>

                                <div className='mt-3'>
                                    <label>Registered Date</label>
                                    <input
                                        type="date"
                                        name="registeredDate"
                                        className='form-control'
                                        required
                                        value={registeredDate}
                                        onChange={(e) => setRegisteredDate(e.target.value)}
                                    />

                                </div>
                                <div className='mt-3'>
                                    <label>Brand</label>
                                    <select className='form-select' 
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}>
                                            <option value="">Select Bus Brand</option>
                                            <option value="Ashoke Layland">Ashoke Layland</option>
                                            <option value="Suzuki">Suzuki</option>
                                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                                            <option value="Volvo">Volvo</option>
                                            <option value="Toyota">Toyota</option>
                                            <option value="Ford">Ford</option>
                                            <option value="Chevrolet">Chevrolet</option>
                                            <option value="Isuzu">Isuzu</option>
                                            <option value="Hyundai">Hyundai</option>
                                            <option value="Scania">Scania</option>
                                    </select>

                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='mt-3'>
                                            <label>Passengers Capacity</label>
                                            <input
                                                type="number"
                                                name="passangers_capacity"
                                                className='form-control'
                                                required
                                                value={passengersCapacity}
                                                onChange={(e) => setPassengersCapacity(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mt-3'>
                                            <label>Bus Type</label>
                                            <select className='form-select' 
                                                value={busType}
                                                onChange={(e) => setBusType(e.target.value)}>
                                                <option value="">Select Bus Type</option>
                                                <option value="ac">AC Bus</option>
                                                <option value="none-ac">Non-AC Bus</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className='row'>
                                    <div className='col'>
                                        <div className='mt-3'>
                                            <label>Km Per L</label>
                                            <input
                                                type="number"
                                                className='form-control'
                                                required
                                                value={kmPerL}
                                                onChange={(e) => setKmPerL(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mt-3'>
                                            <label>Bus Route</label>
                                            <select   className='form-select'
                                                value={busRoute}
                                                onChange={(e) => setBusRoute(e.target.value)}>
                                                <option value="">Bus Route</option>
                                                {busRoutes.map((route) => (
                                                    <option key={route._id} value={route.routeNumber}>
                                                    {route.startPoint} - {route.endPoint}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className='mt-3'>
                                    <label>Bus Purpose</label>
                                    <select   className='form-select'  
                                            value={busPurpose}
                                            onChange={(e) => setBusPurpose(e.target.value)}>
                                        <option value="">Bus Purpose</option>
                                        <option value="sp">For Special Tours</option>
                                        <option value="pr">For Public Routes</option>
                                    </select>
                                </div>
                                <div className='mt-3'>
                                    <label>Image</label>
                                    <input type='file' className='form-control' onChange={handleImageUpload} />
                                    {imageURL && <Image cloudName='dnomnqmne' publicId={imageURL} width='300' />}
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className='btn btn-success' onClick={save} disabled={btnDisable}>Save</MDBBtn>
                                <MDBBtn className='btn btn-danger' onClick={()=>setBasicModal(!basicModal)}>Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                   
                    <MDBModal staticBackdrop show={basicEditModal} setShow={setBasicEditModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                            <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                                <MDBModalTitle className='text-warning'>EDIT BUS</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none'  onClick={toggleEditShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                    <div className='mt-2'>
                                        <label>Bus Number</label>
                                        <input
                                            type="text"
                                            name="busNumber"
                                            className='form-control'
                                            required
                                            disabled
                                            value={editBusNumber}
                                            onChange={(e) => setEditBusNumber(e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className='mt-3'>
                                        <label>Chassis Number</label>
                                        <input
                                            type="text"
                                            name="chassisNumber"
                                            className='form-control'
                                            required
                                            disabled
                                            value={editChassisNumber}
                                            onChange={setEditChassisNumber}
                                        />
                                        <small style={{color:checkChassiColor}}>{check_chassi}</small>
                                    </div>

                                    <div className='mt-3'>
                                        <label>Registered Date</label>
                                        <input
                                            type="text"
                                            name="registeredDate"
                                            className='form-control'
                                            required
                                            disabled
                                            value={editRegisteredDate}
                                            onChange={(e) => setEditRegisteredDate(e.target.value)}
                                        />

                                    </div>
                                    <div className='mt-3'>
                                        <label>Brand</label>
                                        <select className='form-control' 
                                            value={editBrand}
                                            disabled
                                            onChange={(e) => setEditBrand(e.target.value)}>
                                                <option value="">Select Bus Brand</option>
                                                <option value="Ashoke Layland">Ashoke Layland</option>
                                                <option value="Suzuki">Suzuki</option>
                                                <option value="Mercedes-Benz">Mercedes-Benz</option>
                                                <option value="Volvo">Volvo</option>
                                                <option value="Toyota">Toyota</option>
                                                <option value="Ford">Ford</option>
                                                <option value="Chevrolet">Chevrolet</option>
                                                <option value="Isuzu">Isuzu</option>
                                                <option value="Hyundai">Hyundai</option>
                                                <option value="Scania">Scania</option>
                                        </select>

                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='mt-3'>
                                                <label>Passengers Capacity</label>
                                                <input
                                                    type="number"
                                                    name="passangers_capacity"
                                                    className='form-control'
                                                    required
                                                    value={editPassengersCapacity}
                                                    onChange={(e) => setEditPassengersCapacity(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='mt-3'>
                                                <label>Bus Type</label>
                                                <select className='form-select' 
                                                    value={editBusType}
                                                    onChange={(e) => setEditBusType(e.target.value)}>
                                                    <option value="">Select Bus Type</option>
                                                    <option value="ac">AC Bus</option>
                                                    <option value="none-ac">Non-AC Bus</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='mt-3'>
                                                <label>Km Per L</label>
                                                <input
                                                    type="number"
                                                    className='form-control'
                                                    required
                                                    value={editKmPerL}
                                                    onChange={(e) => setEditKmPerL(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='mt-3'>
                                                <label>Bus Route</label>
                                                <select   className='form-select'
                                                    value={editBusRoute}
                                                    onChange={(e) => setEditBusRoute(e.target.value)}>
                                                    <option value="">Bus Route</option>
                                                    {busRoutes.map((route) => (
                                                        <option key={route._id} value={route.routeNumber}>
                                                        {route.startPoint} - {route.endPoint}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='mt-3'>
                                        <label>Bus Purpose</label>
                                        <select   className='form-select'  
                                                value={editBusPurpose}
                                                onChange={(e) => setEditBusPurpose(e.target.value)}>
                                            <option value="">Bus Purpose</option>
                                            <option value="sp">For Special Tours</option>
                                            <option value="pr">For Public Routes</option>
                                        </select>
                                    </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                
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

export default BusManage;


