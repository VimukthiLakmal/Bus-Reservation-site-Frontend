import React from 'react';
import NavBar from './common/before_login';
import Footer from './common/footer';

const TermsAndConditions = () => {
  return (
    <>
    <NavBar/>
    <div className='container m-5 rounded' style={{backgroundColor:'#EAE8DB'}} >
        <div style={{padding:'4%'  }}>
        <h1 className='text-center'>Terms and Conditions</h1>
        <hr/>
        <br/>
        <h4>Introduction</h4>
        <p>Welcome to Dushan Motors' Terms and Conditions page....</p>
        <br/>
        <h4>Service Description</h4>
        <p>
            Dushan Motors is a vehicle and bus company that provides transportation services. We operate a fleet of well-maintained buses for regular routes and special trips.
        </p>
        <br/>

        <h4>Limitation of Liability</h4>
        <p>
            Dushan Motors shall not be held liable for any direct, indirect, incidental, consequential, or special damages arising from the use of our services or inability to use them.
        </p>
        <br/>
        <h4>Indemnification</h4>
        <p>
            You agree to indemnify and hold harmless Dushan Motors, its employees, and affiliates from any claims, damages, liabilities, or expenses arising out of your use of our services.
        </p>
        <br/>
        <h4>Governing Law</h4>
        <p>
            These terms and conditions are governed by and construed in accordance with the laws of [Your Country/Region], and you agree to submit to the exclusive jurisdiction of its courts.
        </p>
        <br/>
        <h4>Changes to Terms</h4>
        <p>
            Dushan Motors may revise these terms at any time without notice. By continuing to use our services, you agree to be bound by the most current version of these terms.
        </p>
        <br/>
        <br/>
       </div>
    </div>
    <Footer/>
    </>
  );
};

export default TermsAndConditions;
