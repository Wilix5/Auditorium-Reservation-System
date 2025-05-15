import React, { useEffect } from "react";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Button,
  Col,
  Row,
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate,Link  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const loggedUser = useSelector((state) => state.user.user);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", data);

      // Store user to Redux and localStorage
      dispatch(loginUser(res.data));
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("✅ Login successful!");
      // Redirection handled in useEffect

    } catch (err) {
      alert("❌ " + (err.response?.data?.message || "Login failed"));
    }
  };

  // Redirect based on user role after login
  useEffect(() => {
    if (loggedUser) {
      if (loggedUser?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [loggedUser, navigate]);

  return (
    <Container>
      <Row className="justify-content-center mt-5 text-light">
        <Col md={6}>
          <div className="form-container">
            <h3 className="text-center mb-4">Login</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label for="email">Email</Label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register("email")}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                  required
                />
              </FormGroup>
              <Button type="submit" color="primary" block>
                Login
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-info">
                Register here
              </Link>
            </div>
            
          </div>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
