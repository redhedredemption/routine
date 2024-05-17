import { useState, useEffect } from "react";
import * as medicationsAPI from "../../utilities/medications-api";
import { Link } from "react-router-dom";
import Modal  from '../../components/Modal/Modal';
// import "./MedicationsPage.css";

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);

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

  const openEditModal = (medication) => {
    setCurrentMedication(medication);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentMedication(null);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrentMedication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();
    try {
      await medicationsAPI.updateMedication(currentMedication._id, currentMedication);
      const updatedMedications = medications.map(r => r._id === currentMedication._id ? currentMedication : r);
      setMedications(updatedMedications);
      closeEditModal();
    } catch (error) {
      console.error("Error updating medication:", error);
    }
  };

  return (
    <>
      <h1>Medications</h1>
      <div className="add-button-container">
      <Link to="/medications/new" className="button">Add New Medication</Link>
      </div>
      <div className="card-container">
        {medications.length ? (
          medications.map(medication => (
            <div key={medication._id} className="item-card">
              <h3>{medication.title}</h3>
              <p>{medication.description}</p>
              <div className="button-group">
                <button onClick={() => handleDelete(medication._id)}>Delete</button>
                <button onClick={() => openEditModal(medication)}>Edit</button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>There are no medications available at the moment!</p>
        )}
      </div>
      <Modal isOpen={isEditing} onClose={closeEditModal}>
        <form onSubmit={handleSubmitEdit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentMedication?.title || ''}
            onChange={handleEditChange}
            required
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={currentMedication?.description || ''}
            onChange={handleEditChange}
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      </Modal>
      <img src="/images/medications.png" alt="home"/>
    </>
  );
}
