import React from "react";
import { Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <br />
        <Container>
          <center>
            <h3><br/><br/><br/><br/>404 <br/><br />Page not found!</h3><br />
          <Link to='/'><Button >Home</Button></Link>
          </center>
        </Container>
      </>
    );
  }
}
export default NotFoundPage;