import * as medicationsAPI from '../../utilities/medications-api';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewMedicationPage() {
  const [form, setForm] = useState({
    title: '',
    description: ''
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
      const response = await medicationsAPI.addMedication(form)
      navigate('/medications')
  }

  return (
    <div>
      <h1>Add New Medication</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Medication</button>
      </form>
    </div>
  );
}