import React , {useEffect , useState} from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn , MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import Footer from './common/footer';
import NavBar from './common/after_login';
import Cookies from 'js-cookie';

function CustomerProfile() {

    const [userID, setUserID] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [telephone, setTelephone] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        var userDate = Cookies.get('profile');
        var user_json = JSON.parse(userDate);
        setUserID(user_json['userId']);
        fun_profile(user_json['userId']);
       
    }, []);

    async function fun_profile(u_id){
        try {
            const response = await axios.get('http://localhost:5000/passenger/passengers/'+u_id);
            console.log(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setGender(response.data.gender);
            setTelephone(response.data.telephone);
            setBloodGroup(response.data.bloodGroup);
            setDateOfBirth(response.data.dateOfBirth);
            setAddress(response.data.address);

        } catch (error) {
            console.error('Error fetching buses:', error);
        }
    }

    return (
        <>
        <div style={{backgroundColor : '#E2E7E9'}}>
        <NavBar/>
        
            <MDBContainer className="my-5">
                <MDBRow>
                    <MDBCol md="4">
                        <MDBCard  className='h-100'>
                            <MDBCardBody>
                                <div className="text-center">
                                    <MDBIcon fas icon="user-circle" size="5x" className="mb-3" />
                                    <h4 className='text-uppercase' style={{letterSpacing:'2px'}}>{name}</h4>
                                    <p className='pb-2'>{email}</p>
                                    <hr/>
                                    
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="8">
                        <MDBCard  className='h-100'>
                            <MDBCardBody>
                                <h3>Profile Information</h3>
                                <hr/>
                                <div className='ps-4'> 
                                    <h6 style={{color:'green' , lineHeight:'22px'}}>Full Name : <span style={{color:'black' , fontWeight:'400'}}>{name}</span></h6>
                                    <h6 style={{color:'green' , lineHeight:'22px'}}>Email Address : <span style={{color:'black' , fontWeight:'400'}}>{email}</span></h6>
                                    <h6 style={{color:'green' , lineHeight:'22px'}}>Gender : <span style={{color:'black' , fontWeight:'400'}}>{gender}</span></h6>
                                    <h6 style={{color:'green' , lineHeight:'22px'}}>Telephone : <span style={{color:'black' , fontWeight:'400'}}>{telephone}</span></h6>
                                    <h6 style={{color:'green' , lineHeight:'22px'}}>Blood Group : <span style={{color:'black' , fontWeight:'400'}}>{bloodGroup}</span></h6>
                                    <h6 style={{color:'green' , lineHeight:'22px'}}>BOD : <span style={{color:'black' , fontWeight:'400'}}>{dateOfBirth}</span></h6>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            
         
        </div>
        <Footer/>
        </>
    );
}

export default CustomerProfile;
