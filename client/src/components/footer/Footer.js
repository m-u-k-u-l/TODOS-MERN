import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from "react-router-dom";

function Footer() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className='foot-bar'>
      <Container fluid>
      <Link to='/' className='linkk' ><img className='applogo'  src='/images/logoimg.png'/> TODOS</Link>
        <Navbar.Collapse id="responsive-navbar-nav">
          <p style={{'color': 'black', 'position': 'absolute', 'top': '18px', 'right': '14px', 'fontSize':'15px', 'fontWeight':'500' }}>
          © 2023 copyright todos.com
        </p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Footer;