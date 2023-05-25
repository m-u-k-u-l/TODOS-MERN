import React from "react";
import { Container, Row, Col} from 'react-bootstrap';

class About extends React.Component {
  render() {
    return(
      <>
      <br/>
      <Container>
        <h3>Hii! My name is Mukul Sharma.</h3>
        <p>I am a fullstack developer.</p>
        <p></p>
        <h4>Experience</h4><p>1.5 years + experience in full stack development.</p>
        <h4>Skills</h4>
        <Row>
          <Col sm={4}>
            <h5>Languages</h5>
            <ul>
              <li>HTML5</li>
              <li>CSS</li>
              <li>Javascript (ES6+)</li>
              <li>PHP</li>
            </ul>
            <h5>Databases</h5>
            <li>MySql</li>
            <li>MongoDB</li>

          </Col>
          <Col sm={4}>
              <h5>Librearies and Frameworks</h5>
              <li>jQuery</li>
              <li>Bootstrap</li>
              <li>MUI</li>
              <li>React js</li>
              <li>Next js</li>
              <li>Node js</li>
              <li>Lb4</li>
          </Col>
          <Col sm={4}>
              <h5>Tools and Technologies</h5>
              <li>Git and Github</li>
              <li>VS Code editor</li>
          </Col>
        </Row>
        <br/>
        <h4>Contact and Links</h4>
        <ul>
          <li>Email : mukul28sharma@gamil.com</li>
          <li>LinkedIn : <a href='https://www.linkedin.com/in/mukul-sharma-0170a4179/' target='_blank'>https://www.linkedin.com/in/mukul-sharma-0170a4179/ </a></li>
          <li>Github :  <a href='https://github.com/m-u-k-u-l' target='_blank'>https://github.com/m-u-k-u-l</a></li>
        </ul>
      </Container>
      </>
    );
  }
}
export default About;