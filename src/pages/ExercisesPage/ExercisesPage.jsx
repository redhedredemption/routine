import { useState, useEffect } from "react";
import * as exercisesAPI from "../../utilities/exercises-api";
import { Link } from "react-router-dom";
// import "./ExercisesPage.css";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function getExercises() {
      try {
        const fetchedExercises = await exercisesAPI.getAllExercises();
        console.log("Fetched exercises:", fetchedExercises); 
        setExercises(fetchedExercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    }
    getExercises();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/api/exercises/${id}`, { method: 'DELETE' });
    setExercises(exercises.filter(exercise => exercise._id !== id));
  };

  return (
    <>
      <h1>Exercises</h1>
      {exercises.length ? (
        <ul className="exercises-container">
          {exercises.map(exercise => (
            <li key={exercise._id}>
              <h3>{exercise.title}</h3>
              <p>{exercise.description}</p>
              <button onClick={() => handleDelete(exercise._id)}>Delete</button>
              <Link to={`/exercises/edit/${exercise._id}`} className="button">Edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no exercises available at the moment!</p>
      )}
    </>
  );
}
