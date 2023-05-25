import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from "react-router-dom";
import * as common from './../../utils/common';
import APIService from '../../utils/APIService'


const ItemAPI = new APIService();


function Appbar() {

  const [currrentUser, setCurrrentUser] = useState([]);

  useEffect(() => {
    getCurrentUser();
},[])

  const getCurrentUser = async () => {
        
    const res = await ItemAPI.getItem('/api/users/current');
    const getResUsr = res.data
    console.log('Current:', getResUsr)
    setCurrrentUser(getResUsr)
}

  const handleLogout =()=>{
    
    const confirmBox = window.confirm(
      "Do you want to Logout?"
    )
    if (confirmBox === true) {
      common.removeUserSession();
      window.location.reload(true);
    }
   
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className='app-bar'>
      <Container fluid>
        <Link to='/' className='linkk'><img className='applogo'  src='/images/logoimg.png'/> TODOS</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">  
          </Nav>
          
          <Nav>
            {/* <Link to='/' className='linkk' >Home</Link> */}
            <Link to='/about' className='linkk' >About Us</Link>
            <Link to='/app-desc' className='linkk' >App Description</Link>
            <p className='linkk' style={{color:'green'}}>Hi {currrentUser.username} !</p>
            <Link className='linkk' style={{color:'red'}} onClick={handleLogout} >Logout</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;