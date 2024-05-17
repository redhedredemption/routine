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
      <div className="add-button-container">
      <Link to="/exercises/new" className="button">Add New Exercise</Link>
      </div>
      <div className="card-container">
        {exercises.length ? (
          exercises.map(exercise => (
            <div key={exercise._id} className="item-card">
              <h3>{exercise.title}</h3>
              <p>{exercise.description}</p>
              <div className="button-group">
                <button onClick={() => handleDelete(exercise._id)}>Delete</button>
                <button onClick={() => openEditModal(exercise)}>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>There are no exercises available at the moment!</p>
        )}
      </div>
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
      <img src="/images/exercises.png" alt="home"/>
    </>
  );
}
