import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    gstin: '',
    b_name: '',
    o_name: '',
    contact: '',
    email: '',
    location: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message || 'Error signing up');
    }
  };

  return (
    <div className="card p-4">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        {['gstin', 'b_name', 'o_name', 'contact', 'email', 'location', 'password'].map((field) => (
          <div className="form-group mb-3" key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
