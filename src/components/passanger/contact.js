import React, { useState , useEffect } from 'react';
import { MDBIcon} from 'mdb-react-ui-kit';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import NavBar from './common/before_login';
import Footer from './common/footer';

function Contact() {

    return (
        <>
            <NavBar/>
            <div className='mb-5 bg-dark'>
                <div className='P-5 text-center' style={{paddingTop:'5%' , paddingBottom:'5%'}}>
                    <h1 style={{fontSize:'60px' , letterSpacing:'1px'}} className='text-warning'>CONTACT US</h1>
                    <span style={{letterSpacing:'3px' }} className='text-muted'>Home / Contact Us</span>
                </div>
            </div>
            
           
            <section style={{paddingTop:'7%', paddingBottom:'3%' }}>
               
                <div className='container-fluid' style={{paddingTop:'2%' }}>
                    <div className='row text-center' >
                    <div className='col border'>
                        <div className='card  h-100 bg-white shadow-0'>
                            <div className='card-body'>
                                <MDBIcon fas icon="phone" size='2x' />
                                <h1 style={{fontSize:'30px'}} className='fw-normal mt-3'>071 100 2209</h1>
                            </div>
                        </div>
                    </div>
                    <div className='col border'>
                        <div className='card  h-100  bg-white shadow-0'>
                            <div className='card-body '>
                                <MDBIcon fas icon="envelope" size='2x' />
                                <h1 style={{fontSize:'30px'}} className='fw-normal mt-3'>dushant@gmail.com</h1>
                            </div>
                        </div>
                    </div>
                    <div className='col border'>
                        <div className='card  h-100  bg-white shadow-0'>
                            <div className='card-body '>
                                <MDBIcon fas icon="map-marker-alt" size='2x' />
                                <h1 style={{fontSize:'30px'}} className='fw-normal mt-3'>34/3, Main Street , Monragala.</h1>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className='container' style={{paddingTop:'10%' }}>
                    <h3 className='text-uppercase'>Our Location</h3>
                    <hr/>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31687.80372271748!2d79.88771603549692!3d6.893537958746704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25990379a8a4f%3A0x4b887a5266410b49!2sSri%20Jayawardenepura%20Kotte!5e0!3m2!1sen!2slk!4v1691778354738!5m2!1sen!2slk" width="1300" height="370" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>
            <section style={{paddingTop:'7%', paddingBottom:'20%' }}>
               
               <div className='container' style={{paddingTop:'2%' }}>
                   <div className='row' style={{paddingTop:'5%'}} >
                        <div className='col-5 pt-5'>
                            <img src="./img/contact_us.png" style={{width:'70%'}} />
                        </div>
                        <div className='col-7'>
                        <form className='mt-5 p-5 rounded ' style={{backgroundColor:'#EAE8DB'}}>
                            <h2 className='text-center text-uppercase text-decoration-underline'>Contact Form</h2>
                            <div className='mb-3 mt-5'>
                            <label htmlFor='name' className='form-label'>
                                Name
                            </label>
                            <input type='text' className='form-control' id='name' />
                            </div>
                            <div className='mb-3'>
                            <label htmlFor='email' className='form-label'>
                                Email
                            </label>
                            <input type='email' className='form-control' id='email' />
                            </div>
                            <div className='mb-3'>
                            <label htmlFor='message' className='form-label'>
                                Message
                            </label>
                            <textarea className='form-control' id='message' rows='5'></textarea>
                            </div>
                            <div className='text-end'>
                                <button type='submit' className='btn btn-dark'>
                                    Submit
                                </button>
                            </div>
                        </form>
                        </div>

                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}
export default Contact;