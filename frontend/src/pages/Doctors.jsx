
import { useEffect, useState } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Doctors List</h2>
      <ul className="list-group">
        {doctors.map(doc => (
          <li key={doc._id} className="list-group-item">
            {doc.name} - {doc.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
}
