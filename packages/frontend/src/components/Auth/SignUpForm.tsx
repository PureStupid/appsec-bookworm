import { Button, Card, Container, Form } from "react-bootstrap";
import "./form.css";
import { Link } from "react-router-dom";
import {
  UserSignUpBody,
  UserSignUpErrorResponse,
} from "../../types/user.entity";
import { ChangeEvent, FormEvent, useState } from "react";
import { UserRole } from "../../types/user.role";
import { useAuth } from "../../contexts/useAuth";
import { signup } from "../../services/authService";

export default function SignUpForm() {
  const [formData, setFormData] = useState<UserSignUpBody>({
    name: "",
    email: "",
    password: "",
    role: UserRole.STUDENT,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const [submitText, setSubmitText] = useState<string>("Sign Up");
  const [processing, setProcessing] = useState<boolean>(false);

  const auth = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors([]);
    setSubmitDisabled(true);
    setSubmitText("Signing up...");
    setProcessing(true);

    signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    })
      .then((response) => {
        if (response.message === "signup success") {
          setSubmitText("Success!");
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
          setSubmitText("Sign Up");
          if (error.response.status === 400 && error.response.data.errors) {
            const response: UserSignUpErrorResponse = error.response.data;
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

  const onNameChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    // only allow letters and spaces
    if (target.value.match(/[^A-Za-z\s]/)) {
      e.preventDefault();
      return;
    }

    setFormData({ ...formData, name: target.value });
  };

  return (
    <Container className="container-fluid signup-container">
      <Form className="signup-form m-3">
        <h1 className="ms-1 signup-header">Sign Up</h1>
        <p className="ms-1 mb-3">Create an account.</p>
        <Form.Group className="mb-3">
          <Form.Control
            className="signup-input"
            disabled={processing}
            id="signup-email"
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
            className="signup-input"
            disabled={processing}
            id="signup-name"
            onChange={(e) => {
              onNameChange(e);
            }}
            type="text"
            autoComplete="name"
            placeholder="Name"
            value={formData.name}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className="signup-input"
            disabled={processing}
            id="signup-password"
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
            className="signup-input"
            id="signup-role"
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
            <Link to="/login" className="link ms-1">
              Already have an account? Login here!
            </Link>
          </li>
        </ul>
        <Button
          disabled={
            submitDisabled ||
            formData.password.length === 0 ||
            formData.email.length === 0 ||
            formData.name.length === 0
          }
          className="signup-btn"
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
