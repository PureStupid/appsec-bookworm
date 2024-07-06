import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <Container className="container-fluid vh-100">
      <Row className="h-100 align-items-center">
        <Col>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}
