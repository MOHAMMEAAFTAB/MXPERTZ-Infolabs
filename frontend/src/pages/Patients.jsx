
import { useEffect, useState } from "react";
import API from "../api";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/users/patients"); // GET /api/users/patients
        setPatients(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load patients. See console.");
      }
    })();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Patients</h3>
      <ul className="list-group">
        {patients.map(p => <li key={p._id} className="list-group-item">{p.name} — {p.email}</li>)}
      </ul>
    </div>
  );
}
