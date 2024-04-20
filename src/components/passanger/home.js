import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBCardText,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Footer from './common/footer';
import NavBar from './common/before_login';

function Home() {

  function book_now(){
    window.location.href="../passanger/PassangerRegistration";
  }

  return (
    <>
      <NavBar/>
      <div style={{backgroundColor:'#203a43 '}}>
        <div class="container-fluid">
          <MDBRow>
            <MDBCol sm='5'>
              <MDBCard class="bg-transparent">
                <MDBCardBody style={{paddingTop:'15%', paddingLeft:'15%'}}>
                  <MDBCardTitle className='text-warning' style={{fontSize:'50px' , letterSpacing:'2px' , fontWeight:'600'}} >DUSHAN TRAVELERS</MDBCardTitle>
                  <MDBCardText style={{color:'#ECECEC',fontSize:'15px'  , fontWeight:'100' , letterSpacing:'1px'}}>
                    Efficient, user-friendly bus ticket booking. Real-time updates, secure payment, and seat selection. Convenience for travelers.
                  </MDBCardText>
                  <div style={{marginTop:'10%'}}>
                    <MDBBtn  color='light' outline size='lg' onClick={book_now}>BOOK NOW</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol sm='7' >
              <MDBCard  class="bg-transparent text-end">
                <img src="../img/bg_img.png" />
              </MDBCard>
            </MDBCol>
        </MDBRow>
      </div>
    </div>
    <section style={{paddingTop:'10%', paddingBottom:'20%' }}>
      <div className='text-center'>
          <h1 className='text-uppercase fw-normal text-decoration-underline'>ABOUT COMPANY</h1>
      </div>
      <div className='container' style={{paddingTop:'3%' }}>
        <div className='row'>
            <div className='col'>
               <img className='shadow' src="https://w0.peakpx.com/wallpaper/732/469/HD-wallpaper-temsa-maraton-2020-exterior-passenger-bus-european-buses-tourist-bus-mountain-road-bus.jpg" style={{width:'100%' , borderRadius:'10px'}}/>
            </div>
            <div className='col'>
            <h6 className='fw-light text-right' style={{lineHeight:'30px'}}>
            Dushan Motors, headquartered in the scenic region of Monaragala, is a reputable vehicle and bus company with a proud history spanning five successful years. As a leading player in the transportation industry, the company boasts a fleet of 10 well-maintained buses, ready to cater to diverse travel needs. Notably, two of these buses have been exclusively reserved to offer unforgettable experiences for special trips and soul-stirring pilgrimages to revered destinations.
            <br/><br/>Dushan Motors takes great pride in its commitment to providing seamless and reliable transportation services. The remaining buses in the fleet diligently serve regular routes, ensuring smooth commuting experiences for passengers across the region. The company's core values center on prioritizing customer satisfaction, safety, and comfort, making them a preferred choice for both daily commuters and adventure-seeking travelers.
            <br/><br/>With a team of experienced and courteous professionals, Dushan Motors has earned the trust of the local community and beyond. They continue to set new standards in the industry, offering a harmonious blend of efficiency, quality, and affordability. Whether it's a routine journey or a special excursion, Dushan Motors promises a memorable and enjoyable ride for all travelers.
            </h6>
            </div>
        </div>  
      </div>
    </section>
    <section style={{paddingTop:'10%', paddingBottom:'20%' , backgroundColor:'#ABABA1'}}>
      <div className='text-center'>
          <h1 className='text-uppercase fw-normal ' style={{color:'black'}}>Bus Booking Made Easy and Efficient in Sri Lanka</h1>
      </div>
      <div className='container' style={{paddingTop:'3%' }}>
        <h5 className='fw-light text-center'>We provide full fledged online bus booking platform to buy and sell bus seats. The passenger can purchase bus tickets online and in return to confirm the seat reservation, a text message with the details of travel will be be sent.
          <br/><br/>With the efficient bus reservation system from BusSeat.lk, plan your journey early, save your valuable time in buying bus tickets, avoid waiting in long queues, find to your boarding place easily and enjoy your happy journey with comfort.
        </h5>
      </div>
    </section>
    <section style={{paddingTop:'10%', paddingBottom:'20%'}} >
      <div className='text-center'>
          <h1 className='text-uppercase fw-normal text-decoration-underline'>Multiple Payment Options</h1>
      </div>
      <div className='container' style={{paddingTop:'5%' }}>
        <div className='row text-center' >
          <div className='col'>
              <img src='https://busseat.lk/static/images/visacard-96.png' />
              <h5 className='fw-normal'>Visa Card</h5>
          </div>
          <div className='col'>
              <img src='https://busseat.lk/static/images/mastercard-96.png' />
              <h5 className='fw-normal'>Master Card</h5>
          </div>
          <div className='col'>
              <img src='https://busseat.lk/static/images/amexcard-96.png' />
              <h5 className='fw-normal'>Amex Card</h5>
          </div>
          <div className='col'>
              <img src='https://busseat.lk/static/images/dialog.png' />
              <h5 className='fw-normal'>Dialog Finance Card</h5>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
}

export default Home;
