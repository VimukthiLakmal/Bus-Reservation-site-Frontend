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

function NavBar() {

    const [showBasic, setShowBasic] = useState(false);
    function login_now(){
        window.location.href="./passanger/PassangerLogin";
    }

    return (
    <MDBNavbar expand='lg' light bgColor='light'>
        <MDBContainer >
          <MDBNavbarBrand href='/' style={{fontSize:'28px'}} className='fw-bold'>
          
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
                <MDBNavbarLink active aria-current='page' href='/'></MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/'>&nbsp;&nbsp;&nbsp;Home&nbsp;&nbsp;&nbsp;</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='./About'>&nbsp;&nbsp;&nbsp;About&nbsp;&nbsp;&nbsp;</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/Contact'>&nbsp;&nbsp;&nbsp;Contact&nbsp;&nbsp;&nbsp;</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/Terms'>&nbsp;&nbsp;&nbsp;Terms & Condition&nbsp;&nbsp;&nbsp;</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <div className='d-flex input-group w-auto'>
              <MDBBtn color='dark' size='lg' onClick={login_now}>Sign&nbsp;In</MDBBtn>
            </div>
          </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
    );
}

export default NavBar;