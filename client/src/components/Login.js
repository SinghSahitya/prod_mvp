import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', formData);
      alert(`Welcome ${response.data.name}`);
    } catch (error) {
      alert(error.response.data.message || 'Error logging in');
    }
  };

  return (
    <div className="card p-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {['email', 'contact', 'password'].map((field) => (
          <div className="form-group mb-3" key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              className="form-control"
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button className="btn btn-primary w-100">Log In</button>
      </form>
    </div>
  );
}

export default Login;
