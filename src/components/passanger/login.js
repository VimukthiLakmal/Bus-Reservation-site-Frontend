import React, { useState } from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from './common/footer';
import NavBar from './common/before_login';
import Cookies from 'js-cookie';

function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Create an object with the login data
    const loginData = {
      email: email,
      password: password
    };

    // Send a POST request to perform the login
    axios.post('http://localhost:5000/passenger/login', loginData)
      .then((response) => {
        console.log(response.data);
        // Handle success, display a success message using SweetAlert 2
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
        }).then(() => {
          
          if(response.data.isAdmin){
            window.location.href ="../admin/dashboard";
          }else{
            Cookies.set('profile' , JSON.stringify(response.data));
            window.location.href ="../passanger/PassangerDashboard";
          }
        }
        );
        // Clear the form after successful login
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Login failed. Invalid email or password.',
        });
        // Handle error, display an error message or perform any other action
        console.error('Login failed:', error);
      });
  };

  function PassangerPassReset(){
    window.location.href ="../passanger/PassangerPassReset";
  }
  return (
    <div style={{ backgroundColor: '#CCCCB2' }}>
      <NavBar/>
      <div className='container' style={{ paddingTop: '5%', paddingBottom: '10%' }}>
        <div className='row'>
          <div className='col'>
          <img src='../img/bus_p_reg.png' style={{paddingTop:'30%'}}/>
          </div>
          <div className='col'>
            <div className='card'>
              <div className='card-body'>
                <div>
                  <h3 className='text-center text-uppercase text-decoration-underline'>Passenger Login</h3>
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
                  <label htmlFor='passsword'>Password :</label>
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
                <div className='text-center'>
                  <div class="d-grid gap-2 col-12 mx-auto">
                    <MDBBtn type='submit' className='btn btn-dark shadow-0' onClick={handleLogin}>Login</MDBBtn>
                  </div>
                </div>
                <hr style={{marginTop:'10%'}}/>
                <center>
                    <h6 className='text-uppercase ' style={{ cursor:'pointer'}} onClick={PassangerPassReset}>Reset Password</h6>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
