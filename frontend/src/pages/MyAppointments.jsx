
import { useEffect, useState } from "react";
import API from "../api";

export default function MyAppointments() {
  const [appts, setAppts] = useState([]);

  const load = async () => {
    try {
      const res = await API.get("/appointments/me"); 
      setAppts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load appointments");
    }
  };

  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    try {
      await API.patch(`/appointments/${id}/cancel`); 
      alert("Cancelled");
      load();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>My Appointments</h3>
      <table className="table">
        <thead><tr><th>Doctor</th><th>Patient</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {appts.map(a => (
            <tr key={a._id}>
              <td>{a.doctor?.name}</td>
              <td>{a.patient?.name}</td>
              <td>{new Date(a.date).toLocaleString()}</td>
              <td>{a.status}</td>
              <td>
                {a.status === "booked" && <button className="btn btn-sm btn-danger" onClick={() => cancel(a._id)}>Cancel</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
