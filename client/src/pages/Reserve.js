import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Form,
  FormGroup,
  Label,
  Button,
  Col,
  Row,
} from "reactstrap";

const Reserve = () => {
  const { id } = useParams(); // auditorium ID
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

const onSubmit = async (data) => {
  try {
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    const res = await axios.post(
      "http://localhost:3001/api/reservations",
      {
        auditoriumId: id,
        date: data.date,
        purpose: data.purpose,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("✅ Reservation successful!");
    navigate("/dashboard");
  } catch (err) {
    alert("❌ Failed to reserve auditorium: " + (err.response?.data?.message || "Server error"));
  }
};



  return (
    <Container>
      <Row className="justify-content-center mt-5 text-light">
        <Col md={6}>
          <div className="form-container">
            <h3 className="text-center mb-4">Reserve Auditorium</h3>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label for="date">Date</Label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  {...register("date", { required: true })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="purpose">Purpose</Label>
                <input
                  type="text"
                  className="form-control"
                  id="purpose"
                  {...register("purpose", { required: true })}
                />
              </FormGroup>
              <Button type="submit" color="success" block>
                Confirm Reservation
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Reserve;
