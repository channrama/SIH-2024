import React from 'react'
import Layout from '../Components/Layout'
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import './csspages/About.css'
const About = () => {
  return (
   <>
   <Layout>
   <Container className="my-5">
      <Row>
        <Col md={6}>
          <p>
          Who We Are
          At AgriSite, we are dedicated to transforming the agricultural landscape through innovative contract farming solutions. Founded in 2024, we specialize in providing farmers with secure and reliable contracts that ensure fair pricing, timely payment, and access to high-quality inputs and support.
          </p>
          <h2>Our Mission</h2>
          <p>
          Our mission is to empower farmers by bridging the gap between agricultural producers and markets. We are committed to fostering sustainable farming practices, enhancing productivity, and improving the livelihoods of farmers through assured contracts that guarantee:



          </p>
          <h1 className="mb-4">Our Services</h1>
          <p>
          We offer a comprehensive range of contract farming services tailored to meet the diverse needs of our farmers:
          Customizable Contracts: Flexible contract terms that cater to different crops and farming practices.
          </p>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Meet the Team</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                    <h2>Team Member 1</h2>
                     </Col>
                  <Col md={8}>
                    <h5>Manoj S</h5>
                    <p>Founder & CEO</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                  <h2>Team Member 2</h2>
                  </Col>
                  <Col md={8}>
                    <h5>Channappa</h5>
                    <p>Co-founder</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                  <h2>Team Member 3</h2>
                  </Col>
                  <Col md={8}>
                    <h5>Bhavith</h5>
                    <p>Chief Operating Officer</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                  <h2>Team Member 4</h2>
                  </Col>
                  <Col md={8}>
                    <h5>Lakshmipathi R</h5>
                    <p>Manager</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                  <h2>Team Member 5</h2>
                  </Col>
                  <Col md={8}>
                    <h5>Kalpana Killi</h5>
                    <p>Prompt engineer, Business Analyst</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                  <h2>Team Member 6</h2>
                  </Col>
                  <Col md={8}>
                    <h5>Sherine</h5>
                    <p>Developer</p>
                  </Col>
                </Row>
              </ListGroup.Item>
              {/* Add more team members as needed */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
      </Layout>
   </>
  )
}
//dont change the name of function while building
export default About
