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
import Cookies from 'js-cookie';

function Employee() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [experinceYears, setExperienceYears] = useState('');
    const [gender, setGender] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [bus, setBusNumber] = useState('');
    const [position, setPosition] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [ageEdit, setAgeEdit] = useState('');
    const [experinceYearsEdit, setExperienceYearsEdit] = useState('');
    const [genderEdit, setGenderEdit] = useState('');
    const [licenseNumberEdit, setLicenseNumberEdit] = useState('');
    const [contactNumberEdit, setContactNumberEdit] = useState('');
    const [addressEdit, setAddressEdit] = useState('');
    const [busEdit, setBusNumberEdit] = useState('');
    const [positionEdit, setPositionEdit] = useState('');

    const [searchText, setSearchText] = useState('');
    
    const [age_validation, setAgeValidation] = useState('');
    const [age_validation_color, setAgeValidationColor] = useState('');
    
    const [tel_validation, setTelValidation] = useState('');
    const [tel_validation_color, setTelValidationColor] = useState(''); 
    
    const [age_validationEdit, setAgeValidationEdit] = useState('');
    const [age_validation_colorEdit, setAgeValidationColorEdit] = useState('');
    
    const [tel_validationEdit, setTelValidationEdit] = useState('');
    const [tel_validation_colorEdit, setTelValidationColorEdit] = useState('');
  
    const handleAgeChange = (e) => {
      const { value } = e.target;
      setAge(value);
      if (value < 18 || value > 55) {
        setAgeValidation('Age must be between 18 and 55.');
        setAgeValidationColor('red');
      } else {
        setAgeValidation('Age is valid');
        setAgeValidationColor('green');
      }
    }; 
    
    const handleAgeChangeEdit = (e) => {
      const { value } = e.target;
      setAgeEdit(value);
      if (value < 18 || value > 55) {
        setAgeValidationEdit('Age must be between 18 and 55.');
        setAgeValidationColorEdit('red');
      } else {
        setAgeValidationEdit('Age is valid');
        setAgeValidationColorEdit('green');
      }
    };

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [basicEditModal, setBasicEditModal] = useState(false);
    const toggleEditShow = () => setBasicEditModal(!basicEditModal);

    function back(){
        window.location.href="/admin/dashboard";
    }

    const clearValues = () => {
        setName('');
        setAge('');
        setExperienceYears('');
        setGender('');
        setLicenseNumber('');
        setContactNumber('');
        setAddress('');
        setBusNumber('');
        setPosition('');
    };

    async function save(){
        const newEmployee = {
            name,
            age,
            experinceYears,
            gender,
            licenseNumber,
            contactNumber,
            address,
            bus,
            position,
        };

        try {
            // Make an API call to save the employee data
            await axios.post('http://localhost:5000/employee/addEmployee', newEmployee); 
      
            // If the request is successful, show success message using SweetAlert2
            Swal.fire({
              icon: 'success',
              title: 'Employee Data Saved!',
              text: 'The employee data has been successfully saved.',
              confirmButtonText: 'OK',
            });
            setBasicModal(!basicModal);
            fetchEmployeeData();
            clearValues();
          } catch (error) {
            console.error('Error saving employee data:', error);
            // If there's an error, show an error message using SweetAlert2
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while saving employee data. Please try again later.',
              confirmButtonText: 'OK',
            });
        }
    }

    const [busdata, setBusData] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/bus/getBuses'); // Replace 'your_api_endpoint' with the actual API endpoint to fetch data from
            const jsonData = await response.json();
            setBusData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchEmployeeData = async () => {
        try {
            const response = await fetch('http://localhost:5000/employee/getEmployees'); // Replace 'your_api_endpoint' with the actual API endpoint to fetch employee data from
            const jsonData = await response.json();
            setEmployeeData(jsonData);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchEmployeeData();
    }, []);

    function handleDeleteEmployee(id) {
        // Show a confirmation popup before deleting
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to delete this employee. This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/employee/deleteDrivers/${id}`)
                    .then(() => {
                        Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
                        fetchEmployeeData();
                    })
                    .catch((error) => {
                        Swal.fire('Error', 'Failed to delete the employee.', 'error');
                    });
            }
        });
    }


    const handleContactNumberChange = (e) => {
        const { value } = e.target;
        setContactNumber(value);

        if (!/^\d{10}$/.test(value)) {
            setTelValidation('Contact number must be 10 digits long.');
            setTelValidationColor('red');
        } else {
            setTelValidation('Valid telephone number.');
            setTelValidationColor('green');
        }
    };

    const handleContactNumberChangeEdit = (e) => {
        const { value } = e.target;
        setContactNumberEdit(value);

        if (!/^\d{10}$/.test(value)) {
            setTelValidationEdit('Contact number must be 10 digits long.');
            setTelValidationColorEdit('red');
        } else {
            setTelValidationEdit('Valid telephone number.');
            setTelValidationColorEdit('green');
        }
    };

    function handleViewEmployee(data) {    
        Swal.fire({
            title: 'Employee Details',
            html: `<div class='text-start'><br/>
                <p><strong>Full Name:</strong> ${data.name}</p>
                <p><strong>Address:</strong> ${data.address}</p>
                <p><strong>Gender:</strong> ${data.gender}</p>
                <p><strong>Contact Number:</strong> ${data.contactNumber}</p>
                <p><strong>Experience Years:</strong> ${data.experinceYears}</p>
                <p><strong>License Number:</strong> ${data.licenseNumber}</p>
                <p><strong>Age:</strong> ${data.age}</p>
                <p><strong>Position:</strong> ${data.position}</p>
                <p><strong>Bus:</strong> ${data.bus}</p>
                <p><strong>Status:</strong> ${data.status === '1' ? 'Activate' : 'Inactive'}</p>
                </div>
            `,
            confirmButtonText: 'OK',
        });
    }

    function handleEditEmployee(data){
        setNameEdit(data.name);
        setAgeEdit(data.age);
        setExperienceYearsEdit(data.experinceYears);
        setGenderEdit(data.gender);
        setLicenseNumberEdit(data.licenseNumber);
        setContactNumberEdit(data.contactNumber);
        setAddressEdit(data.address);
        setBusNumberEdit(data.bus);
        setPositionEdit(data.position);
        setBasicEditModal(!basicEditModal);
    }

    function Edit(){
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to save the changes?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, save changes',
            cancelButtonText: 'Cancel',
          }).then((result) => {
            if (result.isConfirmed) {
                
            }
        });
    }

    async function search_emp() {
        try {
          const response = await axios.get(`http://localhost:5000/employee/searchEmp/${searchText}`);
          const searchData = response.data;
          
          if(searchData.employees !== false){
            setEmployeeData(searchData.employees);
          }else{
             
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'There are no employees.',
            });
          }
        
        } catch (error) {
          console.error('Error searching employees:', error);
        }
    }

    function clear(){
        setSearchText('');
        fetchEmployeeData();
    }
  return (
    <>
    <NavBar/>
    <div style={{backgroundColor : '#E2E7E9'}}>
        <main style={{marginTop: "58px" , backgroundColor :'#D7DDDC'}}>
            <div class="container pt-5 pb-5">
                <div className='container'>
                    <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                    <p style={{fontSize:'18px' , lineHeight:'20px'}}>Employee Managing</p>
                    <hr/>
                    <div className='text-end'>
                        <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                        <button className='btn btn-dark ' onClick={toggleShow}>Add Employee</button>
                    </div>
                    <div className='bg-white p-3 rounded mt-4'>
                        <h5 className='text-uppercase'>Filter Data</h5>
                        <hr/>
                        <div className='row pb-3'>
                            <div className='col'>
                              <label>Employee Name</label>
                              <input type='text' className='form-control' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                            </div>
                            <div className='col'>
                              <br/>
                              <button className='btn btn-dark shadow-0' onClick={search_emp}>Seach</button>{' '}
                              <button className='btn btn-outline-dark shadow-0' onClick={clear}>Clear</button>
                            </div>
                        </div>
                    </div>
                    <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'  className='text-center'>Full Name</th>
                                <th scope='col'  className='text-center'>Contact Number</th>
                                <th scope='col'  className='text-center'>Experience Years</th>
                                <th scope='col'  className='text-center'>Age</th>
                                <th scope='col'  className='text-center'>Position</th>
                                <th scope='col'  className='text-center'>Status</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{ backgroundColor: 'white' }}>
                            {employeeData.map((employee, index) => (
                                <tr key={index}>
                                    <td >{employee.name}</td>
                                    <td className='text-center'>{employee.contactNumber}</td>
                                    <td className='text-center'>{employee.experinceYears}</td>
                                    <td className='text-center'>{employee.age}</td>
                                    <td className='text-center'>{employee.position}</td>
                                    <td className='text-center'>{employee.status === '1' ? 'Active' : 'Inactive'}</td>

                                    <td className='text-center'>   
                                        <MDBBtn  color='danger' outline size='sm' className='shadow-0' onClick={() => handleDeleteEmployee(employee._id)}><MDBIcon fas icon="trash" /></MDBBtn>{' '}
                                        <MDBBtn  color='success' outline size='sm' className='shadow-0' onClick={() => handleViewEmployee(employee)}><MDBIcon fas icon="eye" /></MDBBtn>{' '}
                                        <MDBBtn  color='primary' outline size='sm' className='shadow-0' onClick={() => handleEditEmployee(employee)}><MDBIcon fas icon="pen" /></MDBBtn>
                                    </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>
                    <MDBModal staticBackdrop show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                            <MDBModalTitle className='text-warning'>ADD NEW Employee</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='mt-2'>
                                <div className='mb-3'>
                                    <label htmlFor='name' className='form-label'>Name</label>
                                    <input type='text' id='name' name='name' className='form-control' required value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='age' className='form-label'>Age</label>
                                    <input type='number' id='age' name='age' className='form-control' required value={age} onChange={handleAgeChange} />
                                    <small style={{color:age_validation_color}}>{age_validation}</small>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='experinceYears' className='form-label'>Experience Years</label>
                                    <input type='number' id='experinceYears' name='experinceYears' className='form-control' required value={experinceYears} onChange={(e) => setExperienceYears(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='gender' className='form-label'>Gender</label>
                                    <select id='gender' name='gender' className='form-select' required value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value=''>Select Gender</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='licenseNumber' className='form-label'>License Number</label>
                                    <input type='text' id='licenseNumber' name='licenseNumber' className='form-control' required value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='contactNumber' className='form-label'>Contact Number</label>
                                    <input type='text' id='contactNumber' name='contactNumber' className='form-control' required value={contactNumber} onChange={handleContactNumberChange} />
                                    <small style={{color:tel_validation_color}}>{tel_validation}</small>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='address' className='form-label'>Address</label>
                                    <input type='text' id='address' name='address' className='form-control' required value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='bus' className='form-label'>Bus </label>
                                    <select  className='form-select' required value={bus} onChange={(e) => setBusNumber(e.target.value)} >
                                        <option value="">Select Bus</option>
                                        {busdata.map((bus) => (
                                            <option key={bus._id} value={bus.busNumber}>
                                                {bus.busNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='buse' className='form-label'>Position </label>
                                    <select  className='form-select' required value={position} onChange={(e) => setPosition(e.target.value)} >
                                        <option value="">Select Possition</option>
                                        <option value="driver">Driver</option>
                                        <option value="Conductor">Conductor</option>
                                    </select>
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
                            <MDBModalTitle className='text-warning'>Edit Employee</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleEditShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='mt-2'>
                                <div className='mb-3'>
                                    <label htmlFor='name' className='form-label'>Name</label>
                                    <input type='text' id='name' name='name' className='form-control' required value={nameEdit} onChange={(e) => setNameEdit(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='age' className='form-label'>Age</label>
                                    <input type='number' id='age' name='age' className='form-control' required value={ageEdit} onChange={handleAgeChangeEdit} />
                                    <small style={{color:age_validation_colorEdit}}>{age_validationEdit}</small>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='experinceYears' className='form-label'>Experience Years</label>
                                    <input type='number' id='experinceYears' name='experinceYears' className='form-control' required value={experinceYearsEdit} onChange={(e) => setExperienceYearsEdit(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='gender' className='form-label'>Gender</label>
                                    <select id='gender' name='gender' className='form-control' required value={genderEdit} disabled onChange={(e) => setGenderEdit(e.target.value)}>
                                        <option value=''>Select Gender</option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Other'>Other</option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='licenseNumber' className='form-label'>License Number</label>
                                    <input type='text' id='licenseNumber' name='licenseNumber' className='form-control' required disabled value={licenseNumberEdit} onChange={(e) => setLicenseNumberEdit(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='contactNumber' className='form-label'>Contact Number</label>
                                    <input type='text' id='contactNumber' name='contactNumber' className='form-control' required value={contactNumberEdit} onChange={handleContactNumberChangeEdit} />
                                    <small style={{color:tel_validation_colorEdit}}>{tel_validationEdit}</small>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='address' className='form-label'>Address</label>
                                    <input type='text' id='address' name='address' className='form-control' required value={addressEdit} onChange={(e) => setAddressEdit(e.target.value)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='bus' className='form-label'>Bus </label>
                                    <select  className='form-select' required value={busEdit} onChange={(e) => setBusNumberEdit(e.target.value)} >
                                        <option value="">Select Bus</option>
                                        {busdata.map((bus) => (
                                            <option key={bus._id} value={bus.busNumber}>
                                                {bus.busNumber}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor='buse' className='form-label'>Position </label>
                                    <select  className='form-select' required value={positionEdit} onChange={(e) => setPositionEdit(e.target.value)} >
                                        <option value="">Select Possition</option>
                                        <option value="driver">Driver</option>
                                        <option value="Conductor">Conductor</option>
                                    </select>
                                </div>
                                </div>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className='btn btn-success' onClick={Edit}>Edit</MDBBtn>
                                <MDBBtn className='btn btn-danger' onClick={()=>setBasicEditModal(!basicModal)}>Cancel</MDBBtn>
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

export default Employee;


