import React, { useState , useEffect } from 'react';
import {  MDBContainer,
    MDBNavbar,
    MDBBtn,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse
  } from 'mdb-react-ui-kit';
  import Swal from 'sweetalert2';
  import Cookies from 'js-cookie';

function NavBar() {

    const [showBasic, setShowBasic] = useState(false);

    function logOut(){
        Cookies.remove('profile');
        Swal.fire({
            title: 'Logout',
            text: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/passanger";
            }
        });
    }

    function profile(){
      
      window.location.href = "/passanger/PassangerProfile";
    }

    useEffect(() => {
       const profileCookieValue = Cookies.get('profile');
          if (profileCookieValue !== undefined) {
  
        }else{
            window.location.href = "/passanger";
        }
    },[]);

    return (
    <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer >
          <MDBNavbarBrand href='/passanger/PassangerDashboard' style={{fontSize:'28px'}} className='fw-bold'>
          
            <span className='text-danger'>D.</span>TRAVELERS</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='/passanger/PassangerDashboard'></MDBNavbarLink>
              </MDBNavbarItem>
            
            </MDBNavbarNav>

            <div className='d-flex input-group w-auto'>
              <MDBBtn color='dark' outline size='lg' onClick={logOut}>Logout</MDBBtn>{' '}
              <MDBBtn color='white'  size='lg' onClick={profile}><MDBIcon far icon="user-circle" size="2xl" /></MDBBtn>
            </div>
          </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
    );
}

export default NavBar;