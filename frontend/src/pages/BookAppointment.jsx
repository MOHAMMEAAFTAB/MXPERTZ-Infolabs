
import { useEffect, useState } from "react";
import API from "../api";

export default function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [datetime, setDatetime] = useState(""); // value from <input type="datetime-local">
  const [reason, setReason] = useState("");

  useEffect(() => {
    API.get("/users/doctors").then(res => {
      setDoctors(res.data);
      if (res.data[0]) setDoctorId(res.data[0]._id);
    }).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !datetime) return alert("Choose doctor and date/time");

    // convert to ISO before sending
    const iso = new Date(datetime).toISOString();

    try {
      const res = await API.post("/appointments", { doctorId, date: iso, reason });
      alert("Booked: " + new Date(res.data.date).toLocaleString());
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <select className="form-control mb-2" value={doctorId} onChange={e => setDoctorId(e.target.value)}>
          {doctors.map(d => <option key={d._id} value={d._id}>{d.name} ({d.email})</option>)}
        </select>
        <input className="form-control mb-2" type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} />
        <input className="form-control mb-2" placeholder="Reason (optional)" value={reason} onChange={e => setReason(e.target.value)} />
        <button className="btn btn-primary">Book</button>
      </form>
    </div>
  );
}
