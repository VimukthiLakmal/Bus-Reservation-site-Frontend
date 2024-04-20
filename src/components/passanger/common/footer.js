import React, { useState , useEffect } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
 
    const currentYear = new Date().getFullYear();

  return (
    <MDBFooter className='text-center text-lg-start text-muted' style={{backgroundColor:'#232723'}}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 ' style={{borderBottom:'1px solid #313831'}}>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h5 className='text-uppercase fw-bold mb-4'>
                
                Dushan Motors PVT.
              </h5>
              <p style={{textAlign:'justify'}}>
                Dushan Motors is a vehicle and bus company based in Monaragala. Its history spans five years.
                This company has 10 buses. Two of them have been reserved for special trips and pilgrimages,
                and the other buses have been used for running on normal routes.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                FAQ
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Contact Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Privacy
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>&nbsp;</h6>
              <p>
                <a href='#!' className='text-reset'>
                Offers
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Bus Operators
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Routes
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Service Updates
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                <a href="https://goo.gl/maps/2c8M5nYFvYM57Dag9">
                    34/3, Main Street, Monragala.
      </a>
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                <a href="mailto:dushanmortors@gmail.com">
                  dushanmortors@gmail.com
                </a>
               
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" />
                <a href="tel:+ 94 11 10 22 109">
                + 94 11 10 22 109
                  </a>
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" />
                <a href="tel:+ 94 11 10 22 109">
                + 94 11 10 22 109
                  </a>
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {currentYear} Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          dushanmotor.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
