import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for the routines, replace this with data fetched from server
const mockRoutines = [
  { id: 1, title: 'Morning Stretch', description: 'A gentle routine to start your day.' },
  { id: 2, title: 'Strength Training', description: 'Routine for enhancing muscle strength.' },
  { id: 3, title: 'Evening Relaxation', description: 'Relax your muscles and mind before sleep.' }
];

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    // This would be replaced with an actual API call to fetch routines
    setRoutines(mockRoutines);
  }, []);

  // Function to handle deleting a routine
  const handleDelete = (id) => {
    // Replace this with a call to backend to delete the routine
    setRoutines(routines.filter(routine => routine.id !== id));
  };

  return (
    <div>
      <h1>Routines</h1>
      <Link to="/routines/new">Add New Routine</Link>
      <ul>
        {routines.map(routine => (
          <li key={routine.id}>
            <h3>{routine.title}</h3>
            <p>{routine.description}</p>
            <button onClick={() => handleDelete(routine.id)}>Delete</button>
            <Link to={`/routines/edit/${routine.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
