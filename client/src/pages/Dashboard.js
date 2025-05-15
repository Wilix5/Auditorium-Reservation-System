import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";
import { Button, Container, Spinner, Input } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myReservations, setMyReservations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", purpose: "" });

  const auditoriums = [
    { id: 1, name: "Auditorium A" },
    { id: 2, name: "Auditorium B" },
    { id: 3, name: "Auditorium C" },
  ];

  const logout = () => {
    dispatch(logoutUser());
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const ipRes = await axios.get("https://api64.ipify.org?format=json");
        const geoRes = await axios.get(`https://ipapi.co/${ipRes.data.ip}/json/`);
        setLocation({
          ip: ipRes.data.ip,
          country: geoRes.data.country_name,
          region: geoRes.data.region,
        });
      } catch (err) {
        console.error("Location fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchMyReservations = async () => {
      const stored = localStorage.getItem("user");
      const token = stored ? JSON.parse(stored).token : null;
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:3001/api/reservations/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyReservations(res.data);
      } catch (err) {
        console.error("Failed to fetch your reservations", err);
      }
    };

    fetchMyReservations();
  }, []);

  const deleteReservation = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      await axios.delete(`http://localhost:3001/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyReservations((prev) => prev.filter((r) => r._id !== id));
      alert("Deleted successfully");
    } catch (err) {
      alert("Failed to delete reservation");
    }
  };

  const startEdit = (r) => {
    setEditId(r._id);
    setEditForm({ date: r.date.split("T")[0], purpose: r.purpose });
  };

  const saveEdit = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const res = await axios.put(
        `http://localhost:3001/api/reservations/${editId}`,
        editForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMyReservations((prev) =>
        prev.map((r) => (r._id === editId ? res.data : r))
      );
      setEditId(null);
      alert("Updated successfully");
    } catch (err) {
      alert("Failed to update reservation");
    }
  };

  return (
    <Container className="text-light mt-5">
      <h2>Welcome, {user?.name}</h2>
      <p>Email: {user?.email}</p>

      {loading ? (
        <Spinner color="light" />
      ) : location ? (
        <>
          <p>Your IP: {location.ip}</p>
          <p>Location: {location.region}, {location.country}</p>
        </>
      ) : (
        <p>Could not detect your location.</p>
      )}

      <Button color="danger" onClick={logout} className="mt-3 mb-4">
        Logout
      </Button>

      <h4>Available Auditoriums</h4>
      {auditoriums.map((audi) => (
        <div key={audi.id} className="d-flex justify-content-between align-items-center mb-3">
          <p className="mb-0">{audi.name}</p>
          <Button color="success" onClick={() => navigate(`/reserve/${audi.id}`)}>
            Reserve
          </Button>
        </div>
      ))}

      <hr className="bg-light mt-5" />

      <h4>My Reservations</h4>
      {myReservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        myReservations.map((r, index) => (
          <div key={r._id} className="mb-3">
            {editId === r._id ? (
              <div>
                <Input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="mb-2"
                />
                <Input
                  type="text"
                  value={editForm.purpose}
                  onChange={(e) => setEditForm({ ...editForm, purpose: e.target.value })}
                  className="mb-2"
                />
                <Button color="primary" size="sm" onClick={saveEdit} className="me-2">Save</Button>
                <Button color="secondary" size="sm" onClick={() => setEditId(null)}>Cancel</Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  {index + 1}. 📅 {new Date(r.date).toLocaleDateString()} - 🏛️ Auditorium {r.auditoriumId} - ✏️ {r.purpose}
                </span>
                <div>
                  <Button size="sm" color="warning" className="me-2" onClick={() => startEdit(r)}>Edit</Button>
                  <Button size="sm" color="danger" onClick={() => deleteReservation(r._id)}>Delete</Button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </Container>
  );
};

export default Dashboard;
