import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from './common/footer';
import NavBar from './common/before_login';
import Cookies from 'js-cookie';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordReset = () => {
    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Passwords do not match.',
      });
      return;
    }

    // Create an object with the password reset data
    const passwordResetData = {
      email: email,
      password: password,
    };

    // Send a POST request to perform the password reset
    axios
      .post('http://localhost:5000/passReset/' + email, passwordResetData)
      .then((response) => {
        console.log(response.data);
        // Handle success, display a success message using SweetAlert 2
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Password reset successful!',
        }).then(() => {
          Cookies.set('profile', JSON.stringify(response.data));
          // Redirect to a success page or any other appropriate action
          window.location.href = '../passenger/PassengerDashboard';
        });
        // Clear the form after successful password reset
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Password reset failed. Invalid email or an error occurred.',
        });
        // Handle error, display an error message or perform any other action
        console.error('Password reset failed:', error);
      });
  };

  return (
    <div style={{ backgroundColor: '#CCCCB2' }}>
      <NavBar />
      <div className='container' style={{ paddingTop: '5%', paddingBottom: '10%' }}>
        <div className='row'>
          <div className='col'>
            <img src='../img/bus_p_reg.png' style={{ paddingTop: '30%' }} alt='Passenger' />
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <div>
                  <h3 className='text-center text-uppercase text-decoration-underline'>
                    Password Reset
                  </h3>
                </div>
                <div className='mb-3'>
                  <label htmlFor='email'>Email :</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password'>Password :</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='confirmPassword'>Confirm Password :</label>
                  <input
                    type='password'
                    className='form-control'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className='text-center'>
                  <div class='d-grid gap-2 col-12 mx-auto'>
                    <MDBBtn type='submit' className='btn btn-dark shadow-0' onClick={handlePasswordReset}>
                      Reset Password
                    </MDBBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PasswordReset;
