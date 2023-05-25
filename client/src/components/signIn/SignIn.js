import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {Link } from "react-router-dom";
import APIService from '../../utils/APIService'
import * as common from './../../utils/common';

const ItemAPI = new APIService();

function BasicExample() {

  const [formdata, setFormdata] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormdata({
        ...formdata,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formdata.email !== '' && formdata.email !== undefined && formdata.email !== null &&
    formdata.password !== '' && formdata.password !== undefined && formdata.password !== null
    ){
   
    try {
        const res = await ItemAPI.postItem('/api/users/login', formdata);
        const postRes = res.data;
        console.log('res-', postRes);
        if(res.status === 200){  
            common.setUserSession(res.data.accessToken);
            navigate('/');
            window.location.reload(true);
        }
    } catch (e) {             
        if(e.response.status === 401 || e.response.status === 404 ){
          alert('Please enter valid login details')
        }
    }

    }else{
      alert("Please enter valid login details");
    }
       
  };

  return (
    <Container >
      <br/><br/>
      <center>
      <Link to='#' className='linkk'><img className='applogo'  src='/images/logoimg.png'/> TODOS</Link><br/><br/>
        <h1>Sign In</h1>
        </center>
      <br/>
    <Row>
    <Col sm={3}></Col>
    <Col sm={6}>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange}/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' onChange={handleChange}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
        {/* <Form.Check type="checkbox" label="Check me out" /> */}
      {/* </Form.Group> */}
      <p>Not a member? <Link to='/sign-up' className=''>Sign Up</Link></p>
      <Button variant="primary" type="submit" onClick={handleSubmit} >SIGN IN</Button>
    </Form>
    </Col>
    <Col sm={3}></Col>
    </Row>
    </Container>
    
  );
}

export default BasicExample;