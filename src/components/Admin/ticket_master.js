import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBRow,
    MDBCol,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBInput,
    MDBTable,
    MDBTableHead,
    MDBIcon,
    MDBTableBody,
  } from 'mdb-react-ui-kit';
import NavBar from './common/nav';
import ReactQuill from 'react-quill';

import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import 'react-quill/dist/quill.snow.css';

const richTextModules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
};
  
const richTextFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'link',
    'image',
];

const editorStyle = { height: '300px'  };

function TickerMaster() {

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [roleName, setRoleName] = useState('');
    const [kmRs, setKmRs] = useState('');

    const [pricePerRole, setPriceForRole] = useState([]);

    const fetchRoleData = async () => {
        try {
            const response = await fetch('http://localhost:5000/ticket_price/getAllRole'); 
            const jsonData = await response.json();
            setPriceForRole(jsonData);
        } catch (error) {
            console.error('Error fetching employee data:', error);
        }
    };

    useEffect(() => {
        fetchRoleData();
    }, []); 
    
    function back(){
        window.location.href="/admin/dashboard";
    }

    const save = () => {

        const data = {
            role_name: roleName,
            price: kmRs,
        };

        axios.post('http://localhost:5000/ticket_price/saveARole', data)
        .then((response) => {
            // Handle success, display a success message
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data saved successfully!',
            });
            // Clear the input fields after successful save
            clearValues();
            setBasicModal(!basicModal);
            fetchRoleData();
        })
        .catch((error) => {
            // Handle error, display an error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to save data.',
            });
            console.error('Error saving data:', error);
        });
    }

    const clearValues = () => {
        setRoleName('');
        setKmRs('');
    };

    const handleEditClick = (data) => {
        // Display a custom SweetAlert2 message with an input form
        Swal.fire({
          title: 'Edit Price and KmPerRS',
          html: `
            <form id="editForm">
              <div class="form-group text-start">
                <label for="price">Price:</label>
                <input type="text" class="form-control" id="price" value="${data.price}" required>
              </div>
            </form>
          `,
          showCancelButton: true,
          confirmButtonText: 'Save Changes',
          preConfirm: () => {
            // Extract the edited values from the form and call the update function
            const price = document.getElementById('price').value;
            return { price };
          },
          didOpen: () => {
            // Focus on the price input field when the popup opens
            document.getElementById('price').focus();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Get the edited values from the form
            const { price } = result.value;
    
            // Call the update function with the edited values
            updatePriceAndKmPerRS(data._id, price);
          }
        });
      };
    
      const updatePriceAndKmPerRS = (id, price) => {
        // Make a PUT request to update the price and kmPerRS in the backend
        axios.put(`http://localhost:5000/ticket_price/updateARole/${id}`, { price })
          .then((response) => {
            // Handle success, display a success message or perform any other action
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Price updated successfully!',
            });

            // Refresh the role data after successful update
            fetchRoleData();
          })
          .catch((error) => {
            // Handle error, display an error message or perform any other action
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to update Price.',
            });
            console.error('Error updating Price:', error);
          });
        
      };
      
    const handleDeleteTicket = (id) => {
        // Show a confirmation popup using SweetAlert2
        Swal.fire({
          icon: 'warning',
          title: 'Are you sure?',
          text: 'You are about to delete this role. This action cannot be undone.',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            // If the user confirms, send a DELETE request to your backend API
            axios.delete(`http://localhost:5000/ticket_price/deleteARole/${id}`)
              .then((response) => {
                // Handle success, show a success message, and update the table
                console.log('Role deleted:', response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Deleted!',
                  text: 'Role has been deleted successfully.',
                });
                fetchRoleData();

              })
              .catch((error) => {
                // Handle error, show an error message, etc.
                console.error('Error deleting role:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to delete role. Please try again later.',
                });
              });
          }
        });
    };    
    

  return (
    <>
    <NavBar/>
    <div style={{backgroundColor : '#E2E7E9'}}>
        <main style={{marginTop: "58px" , backgroundColor :'#D7DDDC'}}>
            <div class="container pt-5 pb-5">
                <div className='container'>
                    <h4 className='text-uppercase ' style={{color:'black'}}>Admin Dashboard</h4>
                    <p style={{fontSize:'18px' , lineHeight:'20px'}}>Bus Ticket Master</p>
                    <hr/>
                    <div className='text-end'>
                        <button className='btn btn-outline-dark' onClick={back}>Back</button>&nbsp;
                        <button className='btn btn-dark ' onClick={toggleShow}>Add New Price</button>
                    </div>
                    <MDBTable className='mt-4'>
                        <MDBTableHead dark>
                            <tr>
                                <th scope='col'  className='text-center'>Role</th>
                                <th scope='col'  className='text-center'>RS Per KM</th>
                                <th scope='col' className='text-center'>Action</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody style={{ backgroundColor: 'white' }}>
                            {pricePerRole.map((role) => (
                                <tr key={role._id}>
                                <td className='text-center'>{role.role_name}</td>
                                <td className='text-center'>{role.price}</td>
                                <td className='text-center'>
                                    <MDBBtn color="primary" outline size='sm' onClick={() => handleEditClick(role)}><MDBIcon fas icon="pen" /></MDBBtn>{' '}
                                    <MDBBtn color="danger" outline size='sm' onClick={() => handleDeleteTicket(role._id)}><MDBIcon fas icon="trash" /></MDBBtn>
                                </td>
                                </tr>
                            ))}
                        </MDBTableBody>
                    </MDBTable>

                    <MDBModal staticBackdrop show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                        <MDBModalDialog centered size='lg'>
                        <MDBModalContent>
                            <MDBModalHeader className='bg-dark'>
                            <MDBModalTitle className='text-warning'>ADD NEW BUS ROUTE</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody className='p-4'>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='role_name' className='form-label'>Role</label>
                                            <input type='text' className='form-control' id='role_name' name='role_name' required  value={roleName} onChange={(e) => setRoleName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='mb-3'>
                                            <label htmlFor='km_for_rs' className='form-label'>Km for RS.</label>
                                            <input type='text' className='form-control' id='km_for_rs' name='km_for_rs' required  value={kmRs} onChange={(e) => setKmRs(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                               
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn className='btn btn-success' onClick={save}>Save</MDBBtn>
                                <MDBBtn className='btn btn-danger' onClick={()=>setBasicModal(!basicModal)}>Cancel</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                        </MDBModalDialog>
                    </MDBModal>
                </div>
            </div>
        </main>
    </div>
    </>
  );
}

export default TickerMaster;


