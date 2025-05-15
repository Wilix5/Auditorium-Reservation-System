import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/api/auth/register", data);
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert("❌ Registration failed: " + (err.response?.data?.message || "Server error"));
    }
  };

  return (
    <Container className="mt-5 text-light">
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Register</h2>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormGroup>
              <Label for="name">Name</Label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input type="text" id="name" {...field} invalid={!!errors.name} />
                )}
              />
              {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input type="email" id="email" {...field} invalid={!!errors.email} />
                )}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input type="password" id="password" {...field} invalid={!!errors.password} />
                )}
              />
              {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </FormGroup>

            <Button type="submit" color="primary" block>
              Register
            </Button>
          </Form>
          <div className="mt-3 text-center">
              <span>You already have an account? </span>
              <Link to="/login" className="text-info">
                Login here
              </Link>
            </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
