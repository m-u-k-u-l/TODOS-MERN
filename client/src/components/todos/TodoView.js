import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col,Form,Card } from 'react-bootstrap';
import { useParams } from 'react-router'
import { useNavigate } from "react-router-dom";
import APIService from '../../utils/APIService'
const ItemAPI = new APIService();

const TodoView = ()=>{

    const [elemData, setelemData] = useState([]);
    const param_id = useParams();
    const user_id = param_id.id;

   

    let navigate = useNavigate();

    useEffect(() => {
        getElement();
    }, [])

    const getElement = async () => {
        const res = await ItemAPI.getItem(`/api/contacts/${user_id}`);
        console.log('res element', res)
        const getRes = res.data
        setelemData(getRes)
        console.log('getRes ::', getRes)
    }
    
    function myDate(date){
        let closedate = new Date(date);
        let month_number = closedate.getMonth()+1;
        let yearr = closedate.getFullYear();
        let datee = closedate.getDate();
        let drawclosenew = datee+'-'+ month_number +'-'+ yearr;
        return drawclosenew;
    }

    return(
        <>
        <br/><br/><br/>
        <Container >
        <Card>
            {/* <Card.Img variant="top" src="/images/default.jpg" width='50px' /> */}
            <Card.Body>
            <Card.Title>{elemData.name}</Card.Title>
            <div style={{'display':'flex','justifyContent': 'space-between'}}>   
                <div style={{'color':'blue', 'fontWeight': '500'}}> 
                    <small><i>{elemData.updatedAt ?  myDate(elemData.updatedAt) : myDate(elemData.createdAt) }</i></small>
                </div>
            </div> 

            <Card.Text>
               
            </Card.Text>
    
            <Card.Text>
            {elemData.email}
            <br/><br/>
            {elemData.phone}
            </Card.Text>
            </Card.Body>
        </Card><br/><br/>
        <Button variant="primary" onClick={() => navigate('/')}>Back</Button>
        </Container >
        </>
    )
}
export default TodoView