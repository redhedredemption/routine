import { useState, useEffect } from "react";
import * as routinesAPI from "../../utilities/routines-api";
import { Link } from "react-router-dom";
import Modal  from '../../components/Modal/Modal';
// import "./RoutinesPage.css";

export default function RoutinesPage() {
  const [routines, setRoutines] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoutine, setCurrentRoutine] = useState(null);

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

  const openEditModal = (routine) => {
    setCurrentRoutine(routine);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentRoutine(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrentRoutine(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      await routinesAPI.updateRoutine(currentRoutine._id, currentRoutine);
      const updatedRoutines = routines.map(r => r._id === currentRoutine._id ? currentRoutine : r);
      setRoutines(updatedRoutines);
      closeEditModal();
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };

  return (
    <>
      <h1>Routines</h1>
      <div className="add-button-container">
      <Link to="/routines/new" className="button">Add New Routine</Link>
      </div>
      <div className="routines-container">
        {routines.length ? (
          routines.map(routine => (
            <div key={routine._id} className="routine-card">
              <h3>{routine.title}</h3>
              <p>{routine.description}</p>
              <div className="button-group">
                <button onClick={() => handleDelete(routine._id)}>Delete</button>
                <button onClick={() => openEditModal(routine)}>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p>There are no routines available at the moment!</p>
        )}
      </div>
      <Modal isOpen={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSubmitEdit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentRoutine?.title || ''}
            onChange={handleEditChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={currentRoutine?.description || ''}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
    </>
  );
}