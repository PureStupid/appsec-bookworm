import { Button, Card, Container, Form } from "react-bootstrap";
import "./form.css";
import { Link } from "react-router-dom";
import { UserLoginBody, UserLoginErrorResponse } from "../../types/user.entity";
import { FormEvent, useState } from "react";
import { UserRole } from "../../types/user.role";
import { useAuth } from "../../contexts/useAuth";
import { login } from "../../services/authService";

export default function LoginForm() {
  const [formData, setFormData] = useState<UserLoginBody>({
    email: "",
    password: "",
    role: UserRole.STUDENT,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [submitText, setSubmitText] = useState<string>("Log In");
  const [processing, setProcessing] = useState<boolean>(false);

  const auth = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors([]);
    setSubmitDisabled(true);
    setSubmitText("Logging in...");
    setProcessing(true);

    login({
      email: formData.email,
      password: formData.password,
      role: formData.role,
    })
      .then((response) => {
        if (response.message === "login success") {
          setSubmitText("Success");
          auth.authenticate(formData);
        }
      })
      .catch(
        (error: {
          response: {
            status: number;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: { errors: any; message: string };
          };
        }) => {
          setProcessing(false);
          setSubmitText("Log In");
          if (error.response.status === 400 && error.response.data.errors) {
            const response: UserLoginErrorResponse = error.response.data;
            const errorMessages = response.errors.map(
              (error: { msg: string }) => error.msg
            );
            setErrors([...errorMessages]);
          } else if (error.response.data.message) {
            setErrors([error.response.data.message]);
          } else {
            setErrors(["An error occurred. Please try again later."]);
          }
          setSubmitDisabled(false);
        }
      );
  };

  return (
    <Container className="container-fluid login-container">
      <Form className="login-form m-3">
        <h1 className="ms-1 login-header">Log In</h1>
        <p className="ms-1 mb-3">Welcome back!</p>
        <Form.Group className="mb-3">
          <Form.Control
            className="login-input"
            disabled={processing}
            id="login-email"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value.replace(" ", ""),
              })
            }
            type="email"
            autoComplete="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className="login-input"
            disabled={processing}
            id="login-password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Select your role</Form.Label>
          <Form.Control
            className="login-input"
            id="login-role"
            as="select"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value as UserRole })
            }
          >
            <option value={UserRole.STUDENT}>Student</option>
            <option value={UserRole.FACULTY}>Faculty</option>
            <option value={UserRole.PARENT}>Parent</option>
            <option value={UserRole.ADMIN}>Admin</option>
          </Form.Control>
        </Form.Group>
        <ul className="list mb-3">
          <li>
            <Link to="/signup" className="link ms-1">
              Don't have an account? Sign up here!
            </Link>
          </li>
        </ul>
        <Button
          disabled={
            submitDisabled ||
            formData.password.length === 0 ||
            formData.email.length === 0
          }
          className="login-btn"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          {submitText}
        </Button>
      </Form>
      {errors && errors.length > 0 && (
        <Card className="invalid-input m-3">
          <Card.Body>
            <Card.Title className="invalid-input-title">Error</Card.Title>
            <Card.Text>
              <ul>
                {errors.map((error, index) => {
                  return <li key={index}>{error}</li>;
                })}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {}
    </Container>
  );
}
