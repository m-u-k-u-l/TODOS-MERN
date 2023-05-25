import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {Link } from "react-router-dom";
import APIService from '../../utils/APIService'
const ItemAPI = new APIService();

function BasicExample() {

  const [formdata, setFormdata] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    // if (formdata.title != '' || formdata.title != undefined) {
    //     setErrormsg('');
    // }
    setFormdata({
        ...formdata,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      if(formdata.username !== '' && formdata.username !== undefined && formdata.username !== null &&
        formdata.email !== '' && formdata.email !== undefined && formdata.email !== null &&
        formdata.password !== '' && formdata.password !== undefined && formdata.password !== null)
      {
      
        const res = await ItemAPI.postItem('/api/users/register', formdata);
        const postRes = res.data;
        console.log('res ---', postRes);
        if (postRes) {
          alert('Registration successful')
            // setShow(true)
             setTimeout(() => {
                 //setShow(false)
                 navigate('/sign-in');
             }, 2000)
            // setSuccess({
            //     ...success,
            //     success: !success
            // });
            // setFormdata([])
        }

      }else{
        alert('Please fill up all the details');
      }
  };

  return (
    <Container >
      <br/><br/>
      <center>
      <Link to='#' className='linkk'><img className='applogo'  src='/images/logoimg.png'/> TODOS</Link><br/><br/>
        <h1>Sign Up</h1>
      </center>
      <br/>
    <Row>
    <Col sm={3}></Col>
    <Col sm={6}>
    <Form>
    <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>User's Name*</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" name='username' required onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email*</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' required onChange={handleChange} />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password*</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" name='password' required  onChange={handleChange}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox" required> */}
        {/* <Form.Check type="checkbox" label="Check me out" /> */}
      {/* </Form.Group> */}
      <p>Already a member? <Link to='/sign-in' className=''>Sign In</Link></p>
      <Button variant="primary" type="submit" onClick={handleSubmit}>SIGN UP</Button>
    </Form>
    </Col>
    <Col sm={3}></Col>
    </Row>
    </Container>
    
  );
}

export default BasicExample;