import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Form, Card , Alert } from 'react-bootstrap';
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import APIService from '../../utils/APIService'
const ItemAPI = new APIService();

const TodoEdit = () => {

    const [elemData, setelemData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [errormsg, setErrormsg] = useState('');
    const [errormsgEmail, setErrormsgEmail] = useState('');
    const [errormsgPhone, setErrormsgPhone] = useState('');
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(false);

    const param_id = useParams();
    const user_id = param_id.id;
    let navigate = useNavigate();

    useEffect(() => {
        getElement();
    }, [success])

    const getElement = async () => {
        const res = await ItemAPI.getItem(`/api/contacts/${user_id}`);
        // console.log('res element', res)
        const getRes = res.data
        setelemData(getRes)
    }

    const handleChange = (e) => {
        e.preventDefault();

        if (e.target.name === 'name') {
            if (elemData.name != '' || elemData.name != undefined) {
                setErrormsg('');
            }
        }
        if (e.target.email === 'email') {
            if (elemData.email != '' || elemData.email != undefined) {
                setErrormsgEmail('');
            }
        }
        if (e.target.phone === 'phone') {
            if (elemData.phone != '' || elemData.phone != undefined) {
                setErrormsgPhone('');
            }
        }
        setelemData({
            ...elemData,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async () => {

        //  console.log('Update elemData : ', elemData.name)

        if (elemData.name === '' || elemData.name === undefined) {
            setErrormsg('Title is required');
            return false
        }else if (elemData.email === '' || elemData.email === undefined) {
            setErrormsgEmail('References is required');
            return false
        }else if (elemData.phone === '' || elemData.phone === undefined) {
            setErrormsgPhone('Description is required');
            return false
        }
        else {

            delete elemData['updatedAt'];
            // console.log('Update elemData : ', elemData)
            //return false
            const res = await ItemAPI.patchItem(`/api/contacts/${user_id}`, elemData);
            const postRes = res;
            console.log('res ---', postRes);
            if (postRes.status === 200) {
                setSuccess({
                    ...success,
                    success: !success
                });
                
                setShow(true)
                setTimeout(() => {
                    setShow(false)
                    navigate('/');
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


    return (
        <>
            <Container >
                {
                    show ?
                        <Alert variant="success" onClose={() => setShow(false)} dismissible><b>Task has been updated successfully!</b></Alert>
                        :
                        <div style={{ 'height': '42px' }}></div>
                }
                <Row>
                    {/* Form */}
                    <Col sm={3}>
                        <h4>Edit</h4>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Title"
                                    name='name'
                                    onChange={handleChange}
                                    defaultValue={elemData.name || ''}
                                />
                                <strong><small style={{ 'color': 'red' }}>{errormsg}</small></strong>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter References"
                                    name='email'
                                    onChange={handleChange}
                                    defaultValue={elemData.email || ''}
                                />
                                <strong><small style={{ 'color': 'red' }}>{errormsgEmail}</small></strong>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter Description"
                                    rows={3}
                                    name='phone'
                                    onChange={handleChange}
                                    defaultValue={elemData.phone || ''}
                                />
                                 <strong><small style={{ 'color': 'red' }}>{errormsgPhone}</small></strong>
                            </Form.Group>
                            <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button> &nbsp;&nbsp;
                            <Button variant="primary" onClick={handleUpdate}>Update</Button>
                        </Form>
                    </Col>

                    <Col sm={1}>
                    </Col>

                    {/* Listing */}
                    <Col sm={8}>
                        <div className="">
                            <h4 className=""></h4>
                        </div>
                        <Row xs={1} md={1} className="g-4">
                            <Col>
                                <Card>
                                    {/* <Card.Img variant="top" src="/images/default.jpg" width='50px' /> */}
                                    <Card.Body>
                                        <Card.Title>{elemData.name}</Card.Title>
                                        <div>
                                            <div style={{ 'color': 'blue', 'fontWeight': '500' }}>
                                                <small><i>{elemData.updatedAt ? myDate(elemData.updatedAt) : myDate(elemData.createdAt)}</i></small>
                                            </div>
                                        </div>

                                        <Card.Text>
                                            {elemData.phone}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <br />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default TodoEdit