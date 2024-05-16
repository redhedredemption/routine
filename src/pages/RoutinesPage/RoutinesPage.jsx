import { useState, useEffect } from "react";
import * as routinesAPI from "../../utilities/routines-api";
import { Link } from "react-router-dom";
// import "./RoutinesPage.css";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    async function getRoutines() {
      try {
        const fetchedRoutines = await routinesAPI.getAllRoutines();
        console.log("Fetched routines:", fetchedRoutines); 
        setRoutines(fetchedRoutines);
      } catch (error) {
        console.error("Error fetching routines:", error);
      }
    }
    getRoutines();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/routines/${id}`, { method: 'DELETE' });
    setRoutines(routines.filter(routine => routine._id !== id));
  };

  return (
    <>
      <h1>Routines</h1>
      {routines.length ? (
        <ul className="routines-container">
          {routines.map(routine => (
            <li key={routine._id}>
              <h3>{routine.title}</h3>
              <p>{routine.description}</p>
              <button onClick={() => handleDelete(routine._id)}>Delete</button>
              <Link to={`/routines/edit/${routine._id}`} className="button">Edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no routines available at the moment!</p>
      )}
    </>
  );
}
