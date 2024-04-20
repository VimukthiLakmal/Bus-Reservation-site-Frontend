import React, { useState , useEffect } from 'react';
import { MDBBtn} from 'mdb-react-ui-kit';
import NavBar from './common/before_login';
import Footer from './common/footer';

function About() {

    return (
        <>
            <NavBar/>
            <div className='mb-5 bg-dark'>
                <div className='P-5 text-center' style={{paddingTop:'5%' , paddingBottom:'5%'}}>
                    <h1 style={{fontSize:'60px' , letterSpacing:'1px'}} className='text-warning'>ABOUT US</h1>
                    <span style={{letterSpacing:'3px' }} className='text-muted'>Home / About Us</span>
                </div>
            </div>
            <section style={{paddingTop:'10%', paddingBottom:'20%' }}>
               
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
            <section style={{backgroundColor:'#EAE8DB' }}>
                <div className='container'>
                    <div style={{paddingTop:'7%', paddingBottom:'20%' }}>
                        <h1 className='text-uppercase fw-normal text-decoration-underline'>OUR FOUNDER</h1>
                        <hr/>
                        <div className='row mt-5'>
                            <div className='col-5'>
                            <h6 className='fw-light' style={{lineHeight:'30px' , textAlign:'justify'}}>
                            As the owner of a dynamic and forward-thinking bus transportation company, I am deeply committed to revolutionizing the way people experience travel. With a passion for exceptional service, we prioritize safety, comfort, and efficiency above all else. Our modern fleet of meticulously maintained buses is equipped with cutting-edge amenities to ensure a seamless journey for every passenger. We take pride in fostering a team of highly skilled drivers and dedicated staff who share our vision of delivering unparalleled travel experiences. With a focus on sustainability, innovation, and customer satisfaction, we're dedicated to redefining the landscape of bus travel and setting new industry benchmarks.
                            </h6>
                            </div>
                            <div className='col-2'></div>
                            <div className='col-5'>
                              <img src="./img/owner.png" style={{width:'65%'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{paddingTop:'7%', paddingBottom:'20%' }}>
                <div className='text-center'>
                    <h1 className='text-uppercase fw-normal text-decoration-underline'>Our Success</h1>
                </div>
                <div className='container' style={{paddingTop:'5%' }}>
                    <div className='row text-center mt-4' >
                    <div className='col'>
                        <h1 style={{fontSize:'83px'}} className='fw-normal'>10</h1>
                        <h5 className='fw-normal'>Total Busses</h5>
                    </div>
                    <div className='col'>
                        <h1 style={{fontSize:'83px'}} className='fw-normal'>10400</h1>
                        <h5 className='fw-normal'>Total Seat Bookings</h5>
                    </div>
                    <div className='col'>
                        <h1 style={{fontSize:'83px'}} className='fw-normal'>920</h1>
                        <h5 className='fw-normal'>Completed Trips</h5>
                    </div>
                    <div className='col'>
                        <h1 style={{fontSize:'83px'}} className='fw-normal'>32</h1>
                        <h5 className='fw-normal'>Our Staff</h5>
                    </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default About;