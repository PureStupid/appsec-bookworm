import { Col, Container, Row } from "react-bootstrap";
import SignUpForm from "../components/Auth/SignUpForm";
import React from "react";

export default function SignUpScreen() {
  return (
    <Container className="container-fluid vh-100">
      <Row className="h-100 align-items-center">
        <Col>
          <SignUpForm />
        </Col>
      </Row>
    </Container>
  );
}
