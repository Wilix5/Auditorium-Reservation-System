import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Table, Spinner } from "reactstrap";

const Admin = () => {
  const token = useSelector((state) => state.user.token);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(res.data);
    } catch (err) {
      console.error("Failed to fetch reservations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Container className="mt-5 text-light">
      <h2>All Reservations</h2>
      {loading ? (
        <Spinner color="light" />
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <Table bordered hover responsive className="bg-dark text-light mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Auditorium</th>
              <th>Date</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r, index) => (
              <tr key={r._id}>
                <td>{index + 1}</td>
                <td>{r.userId?.name || "N/A"}</td>
                <td>{r.userId?.email || "N/A"}</td>
                <td>{r.auditoriumId}</td>
                <td>{new Date(r.date).toLocaleDateString()}</td>
                <td>{r.purpose}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Admin;
