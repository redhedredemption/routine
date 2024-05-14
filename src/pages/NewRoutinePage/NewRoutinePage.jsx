import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRoutinePage() {
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
    try {
      const response = await fetch('/api/routines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Something went wrong with the request.');
      }
      const data = await response.json(); // Assuming the server sends back the added routine
      alert('Routine added successfully!');
      navigate('/routines'); // Redirect to routines page after successful submission
    } catch (error) {
      alert('Failed to create the routine. Please try again.');
      console.error('Failed to submit form:', error);
    }
  };

  return (
    <div>
      <h1>Add New Routine</h1>
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
        <button type="submit">Add Routine</button>
      </form>
    </div>
  );
}