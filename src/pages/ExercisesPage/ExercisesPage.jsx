import { useState, useEffect } from "react";
import * as exercisesAPI from "../../utilities/exercises-api";
import { Link } from "react-router-dom";
import Modal  from '../../components/Modal/Modal';
// import "./ExercisesPage.css";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(null);

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

  const openEditModal = (exercise) => {
    setCurrentExercise(exercise);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentExercise(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrentExercise(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      await exercisesAPI.updateExercise(currentExercise._id, currentExercise);
      const updatedExercises = exercises.map(r => r._id === currentExercise._id ? currentExercise : r);
      setExercises(updatedExercises);
      closeEditModal();
    } catch (error) {
      console.error("Error updating exercise:", error);
    }
  };

  return (
    <>
      <h1>Exercises</h1>
      <Link to="/exercises/new" className="button">Add New Exercise</Link>
      {exercises.length ? (
        <ul className="exercises-container">
          {exercises.map(exercise => (
            <li key={exercise._id}>
              <h3>{exercise.title}</h3>
              <p>{exercise.description}</p>
              <button onClick={() => handleDelete(exercise._id)}>Delete</button>
              <button onClick={() => openEditModal(exercise)}>Edit</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>There are no exercises available at the moment!</p>
      )}
      <Modal isOpen={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSubmitEdit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentExercise?.title || ''}
            onChange={handleEditChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={currentExercise?.description || ''}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </>
  );
}
