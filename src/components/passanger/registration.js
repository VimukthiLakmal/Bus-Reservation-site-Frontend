import React, { useState } from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import Footer from './common/footer';
import NavBar from './common/before_login';

function Registration() {
  
  const [showBasic, setShowBasic] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [telephone, setTelephone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [emailValidation, setEmailValidation] = useState('');
  const [emailValidationColor, setEmailValidationColor] = useState('');
  const [telephoneValidation, setTelephoneValidation] = useState('');
  const [telephoneValidationColor, setTelephoneValidationColor] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passValidation, setPassValidation] = useState('');
  const [passValidationColor, setPassValidationColor] = useState('');

  const [cpassValidation, setCPassValidation] = useState('');
  const [cpassValidationColor, setCPassValidationColor] = useState('');


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateTelephone = (telephone) => {
    const telephoneRegex = /^[0-9]{10}$/;
    return telephoneRegex.test(telephone);
  };

  const handleEmailInput = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    // Validate email format on input and show error message if needed
    if (!validateEmail(inputEmail)) {
      setEmailValidation('Invalid email format.');
      setEmailValidationColor('red');
    } else {
      setEmailValidation('Valid Email Address');
      setEmailValidationColor('green');
    }
  };

  const handleTelephoneInput = (e) => {
    const inputTelephone = e.target.value;
    setTelephone(inputTelephone);
    // Validate telephone format on input and show error message if needed
    if (!validateTelephone(inputTelephone)) {
      setTelephoneValidation('Invalid telephone number format.');
      setTelephoneValidationColor('red');
    } else {
        setTelephoneValidation('Valid telephone number');
        setTelephoneValidationColor('green');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if confirm password matches the password
    if (newConfirmPassword !== password) {
      setCPassValidation('Passwords do not match.');
      setCPassValidationColor('red');
    } else {
      setCPassValidation('Passwords are matching.');
      setCPassValidationColor('green');
    }
  };

  function save() {
    // Validate email format
    if (!validateEmail(email)) {
      setEmailValidation('Invalid email format.');
      setEmailValidationColor('red');
      return;
    } else {
      setEmailValidation('');
      setEmailValidationColor('');
    }

    // Validate telephone format
    if (!validateTelephone(telephone)) {
      setTelephoneValidation('Invalid telephone number format.');
      setTelephoneValidationColor('red');
      return;
    } else {
      setTelephoneValidation('');
      setTelephoneValidationColor('');
    }

    // Create an object with the form data
    const formData = {
      name: name,
      email: email,
      gender: gender,
      telephone: telephone,
      bloodGroup: bloodGroup,
      dateOfBirth: dateOfBirth,
      address: address,
      password:password
    };

    // Send a POST request to save the passenger data
    axios.post('http://localhost:5000/passenger/addPassengers', formData)
      .then((response) => {
        // Handle success, display a success message using SweetAlert 2
       

        // Clear the form after successful submission
        setName('');
        setEmail('');
        setGender('');
        setTelephone('');
        setBloodGroup('');
        setDateOfBirth('');
        setAddress('');
        setPassword('');
        setConfirmPassword('');
       
        const forEmailData = {
          name: name,
          email: email,
          gender: gender,
          telephone: telephone,
          bloodGroup: bloodGroup,
          dateOfBirth: dateOfBirth,
          address: address
        };
        send_email(forEmailData);
      })
      .catch((error) => {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to save passenger data. Please try again later.',
        });
        // Handle error, display an error message or perform any other action
        console.error('Failed to save passenger data:', error);
      });
  }

  const isPasswordValid = () => {
    // Add password validation rules here
    // For example, require a minimum length of 8 characters and at least one digit
    const passwordRegex = /^(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check password validation
    if (!isPasswordValid(newPassword)) {
      setPassValidation('Password must be at least 8 characters long and contain at least one digit.');
      setPassValidationColor('red');
    } else {
      setPassValidation('Strong Password.');
      setPassValidationColor('green');
    }
  };

  function send_email(formData){
    emailjs.send(
        'service_cgok084',
        'template_phw4hxh',
        formData,
        'CnUhV_1Y4qReMwu0s' 
      )
        .then((result) => {
          console.log('Email sent successfully!', result.text);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Passenger data saved successfully! Check your email to view registration confirmation.',
          });
          window.location.href="../passanger/PassangerLogin";
        })
        .catch((error) => {
          console.error('Failed to send email:', error);
          Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save passenger data. Please try again later.',
          });
        });
  }

  function login_action(){
    window.location.href="../passanger/PassangerLogin";
  }

  return (
    <div style={{backgroundColor:'#CCCCB2'}}>
     <NavBar/>
      <div className='container' style={{paddingTop:'5%' , paddingBottom:'10%'}}>
        <div className='row'>
            <div className='col'>
              <img src='../img/bus_p_reg.png' style={{paddingTop:'30%'}}/>
            </div>
            <div className='col'>
               <div  className='card'>
                    <div className='card-body'>
                        <div>
                            <h3 className='text-center text-uppercase text-decoration-underline'>Passanger Registration</h3>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='name'>Name :</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='email'>Email :</label>
                            <input
                                type='email'
                                className='form-control'
                                id='email'
                                name='email'
                                value={email}
                                onChange={handleEmailInput}
                                required
                            />
                            <small style={{color:emailValidationColor}}>{emailValidation}</small>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='gender'>Gender :</label>
                            <select
                                className='form-select'
                                id='gender'
                                name='gender'
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required
                            >
                                <option value=''>Select Gender</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='telephone'>Telephone :</label>
                            <input
                                type='text'
                                className='form-control'
                                id='telephone'
                                name='telephone'
                                value={telephone}
                               onInput={handleTelephoneInput}
                                required
                            />
                            <small style={{ color: telephoneValidationColor }}>{telephoneValidation}</small>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='bloodGroup'>Blood Group :</label>
                            <select
                                className='form-select'
                                id='bloodGroup'
                                name='bloodGroup'
                                value={bloodGroup}
                                onChange={(e) => setBloodGroup(e.target.value)}
                                required
                            >
                                <option value=''>Select Blood Group</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='dateOfBirth'>Date of Birth :</label>
                            <input
                                type='date'
                                className='form-control'
                                id='dateOfBirth'
                                name='dateOfBirth'
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='address'>Address :</label>
                            <input
                                type='text'
                                className='form-control'
                                id='address'
                                name='address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='passsword'>Password :</label>
                            <input
                                type='password'
                                className='form-control'
                                id='password'
                                name='password'
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <small style={{color:passValidationColor}}>{passValidation}</small>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='cpasssword'>Confirm - Password :</label>
                            <input
                                type='password'
                                className='form-control'
                                id='confirmPassword'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            <small style={{ color: cpassValidationColor }}>{cpassValidation}</small>

                        </div>
                        <div className='text-center'>
                            <div class="d-grid gap-2 col-12 mx-auto">
                                <MDBBtn type='submit' className='btn btn-dark shadow-0' onClick={save}>Save</MDBBtn>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <center>
                        <h6 className='text-uppercase ' style={{paddingBottom:'5%' , cursor:'pointer'}} onClick={login_action}>Login Page</h6>
                    </center>
               </div>
            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Registration;
