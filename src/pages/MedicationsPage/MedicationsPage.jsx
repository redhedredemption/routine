import { useState, useEffect } from "react";
import * as medicationsAPI from "../../utilities/medications-api";
import { Link } from "react-router-dom";
// import "./MedicationsPage.css";

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    async function getMedications() {
      try {
        const fetchedMedications = await medicationsAPI.getAllMedications();
        console.log("Fetched medications:", fetchedMedications); 
        setMedications(fetchedMedications);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    }
    getMedications();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/medications/${id}`, { method: 'DELETE' });
    setMedications(medications.filter(medication => medication._id !== id));
  };

  return (
    <>
      <h1>Medications</h1>
      {medications.length ? (
        <ul className="medications-container">
          {medications.map(medication => (
            <li key={medication._id}>
              <h3>{medication.title}</h3>
              <p>{medication.description}</p>
              <button onClick={() => handleDelete(medication._id)}>Delete</button>
              <Link to={`/medications/edit/${medication._id}`} className="button">Edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no medications available at the moment!</p>
      )}
    </>
  );
}
