import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Card, Modal, Alert } from 'react-bootstrap';
import { Trash, PencilSquare, Tv } from 'react-bootstrap-icons';
import { Link } from "react-router-dom";
import APIService from '../../utils/APIService'
import * as common from './../../utils/common';
import { useNavigate  } from 'react-router-dom';

const ItemAPI = new APIService();

const TodosList = () => {

    const [todosdata, setTodosdata] = useState([]);
    const [currrentUser, setCurrrentUser] = useState([]);
    const [formdata, setFormdata] = useState({
        name:'',
        email:'',
        phone:''

    });
    const [success, setSuccess] = useState(false);
    const [errormsg, setErrormsg] = useState('');
    const [errormsgEmail, setErrormsgEmail] = useState('');
    const [errormsgPhone, setErrormsgPhone] = useState('');
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const navigate = useNavigate();    

    const getCurrentUser = async () => {
        
        const res = await ItemAPI.getItem('/api/users/current');
        const getResUsr = res.data
       // console.log('Current:', getResUsr)
        setCurrrentUser(getResUsr)
    }
    const getTodos = async () => {
        const res = await ItemAPI.getItem('/api/contacts');
        const getRes = res.data
        console.log('contacts:', getRes)
        setTodosdata(getRes)
    }
    

    useEffect(() => {
        getTodos();
        getCurrentUser();
        if(!common.getToken()){
            navigate('/sign-in');
        }
    }, [success])

    const handleChange = (e) => {
        e.preventDefault();
        if (formdata.title != '' || formdata.title != undefined) {
            setErrormsg('');
        }
        if (formdata.email != '' || formdata.email != undefined) {
            setErrormsgEmail('');
        }
        if (formdata.phone != '' || formdata.phone != undefined) {
            setErrormsgPhone('');
        }
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {

        if (formdata.name === '' || formdata.name === undefined) {
            setErrormsg('Title is required');
            return false
        }else if (formdata.email === '' || formdata.email === undefined) {
            setErrormsgEmail('References is required');
            return false
        }else if (formdata.phone === '' || formdata.phone === undefined) {
            setErrormsgPhone('Description is required');
            return false
        }
        
        else {
            console.log('formdata: ', formdata)
            const res = await ItemAPI.postItem('/api/contacts', formdata);
            const postRes = res.data;
            console.log('res ---', postRes);
            if (postRes) {
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                }, 3000)
                setSuccess({
                    ...success,
                    success: !success
                });
                setFormdata([])
            }
         }
    };

    const handleDelete = async (idd) => {


        const confirmBox = window.confirm(
            "Aue you sure want to delete?"
          )
          if (confirmBox === true) {

            const res = await ItemAPI.deleteItem(`/api/contacts/${idd}`);
            const deleteRes = res.status;
            console.log('Delete - res ---', deleteRes);
            if (deleteRes === 200) {
                setSuccess({
                    ...success,
                    success: !success
                });
                setShowDel(true)
                setTimeout(() => {
                    setShowDel(false)
                }, 2000)
            }
            
          }

        
    };

    function myDate(date) {
        let closedate = new Date(date);
        let month_number = closedate.getMonth() + 1;
        let yearr = closedate.getFullYear();
        let datee = closedate.getDate();
        let drawclosenew = datee + '-' + month_number + '-' + yearr;
        return drawclosenew;
    }

    const handleClose = () => setShowDel(false);

    return (
        <>
            <Container >
                <Modal show={showDel} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <b>A task has been deleted!</b>
                    </Modal.Header>
                </Modal>
                {
                    show ?
                        <Alert variant="success" onClose={() => setShow(false)} dismissible><b>New task has been created successfully!</b></Alert>
                        :
                        <div style={{ 'height': '42px' }}></div>
                }
                <Row>
                    {/* Form */}
                    <Col sm={3}>
                        <h4>Add New</h4>
                        <br />
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control type="text" placeholder="Enter Title" name='name' onChange={handleChange} value={formdata.name || ''} />
                                <strong><small style={{ 'color': 'red' }}>{errormsg}</small></strong>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter References" name='email' onChange={handleChange} value={formdata.email || ''} />
                                <strong><small style={{ 'color': 'red' }}>{errormsgEmail}</small></strong>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control as="textarea" value={formdata.phone || ''} placeholder="Enter Description" rows={3} name='phone' onChange={handleChange} />
                                <strong><small style={{ 'color': 'red' }}>{errormsgPhone}</small></strong>
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Col>

                    <Col sm={1}>
                    </Col>

                    {/* Listing */}
                    <Col sm={8} className='card-home'>
                        <div className="">
                            <h4 className="">Todos</h4>  <br />
                        </div>
                        <Row xs={1} md={4} className="g-4">
                            {
                                (todosdata && todosdata.length) ?
                                    todosdata.map((elem, i) => (
                                        <Col key={i}>
                                            <Card>
                                                <Card.Img variant="top" src="/images/default.jpg" />
                                                <Card.Body>
                                                    <Card.Title>
                                                        {(elem.name.length > 20) ? elem.name.trim().slice(0, 18) + '...' : elem.name}
                                                    </Card.Title>
                                                    <div className="card-date">
                                                        <div style={{ 'color': 'blue', 'fontWeight': '500' }}>
                                                            <small><i>{elem.updatedAt ? myDate(elem.updatedAt) : myDate(elem.createdAt)}</i></small>
                                                        </div>

                                                    </div>
                                                    <Card.Text>
                                                        {(elem.phone.length > 10) ? elem.phone.slice(0, 10) + '...' : elem.phone}
                                                    </Card.Text>
                                                    <div><center>
                                                        <Link to={`/view/${elem._id}`}><Tv /></Link> &nbsp;
                                                        <Link to={`/edit/${elem._id}`}><PencilSquare /></Link> &nbsp;
                                                        <Link to={'#'} onClick={() => handleDelete(elem._id)}><Trash /></Link> &nbsp;
                                                    </center>    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                    : <p>No task in the list...</p>
                            }
                        </Row>
                        <br />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TodosList