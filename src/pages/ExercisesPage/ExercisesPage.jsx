import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for the exercises, replace this with data fetched from server
const mockExercises = [
  { id: 1, name: 'Arm Circles', description: 'Rotate your arms in a circular motion to improve mobility.' },
  { id: 2, name: 'Leg Raises', description: 'Lift your legs to strengthen the lower body and core.' },
  { id: 3, name: 'Sit to Stand', description: 'Practice sitting down and standing up to enhance leg strength.' }
];

function ExercisesPage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // This would be replaced with an actual API call to fetch exercises
    setExercises(mockExercises);
  }, []);

  // Function to handle deleting an exercise
  const handleDelete = (id) => {
    // Replace this with a call to backend to delete the exercise
    setExercises(exercises.filter(exercise => exercise.id !== id));
  };

  return (
    <div>
      <h1>Exercises</h1>
      <Link to="/exercises/new">Add New Exercise</Link>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <button onClick={() => handleDelete(exercise.id)}>Delete</button>
            <Link to={`/exercises/edit/${exercise.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesPage;
