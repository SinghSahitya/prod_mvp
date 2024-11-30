import React, { useState } from 'react';
import axios from 'axios';
import { auth } from './firebaseConfig';
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

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

  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    const phoneNumber = `+91${formData.contact}`; // Replace with the appropriate country code
    const appVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      { size: 'invisible' },
      auth
    );

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        alert('OTP sent!');
      })
      .catch((error) => alert(`Error sending OTP: ${error.message}`));
  };

  const verifyOtpAndSignup = async (e) => {
    e.preventDefault();
    if (!otp || !confirmationResult) {
      return alert('Please enter the OTP');
    }

    try {
      // Verify OTP
      await confirmationResult.confirm(otp);

      // Send data to backend
      const response = await axios.post('http://localhost:5000/auth/signup', formData);
      alert(response.data.message);
    } catch (error) {
      alert(`Error verifying OTP or signing up: ${error.message}`);
    }
  };

  return (
    <div className="card p-4">
      <h2>Signup</h2>
      <form onSubmit={verifyOtpAndSignup}>
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
        <button type="button" className="btn btn-secondary w-100 mb-2" onClick={sendOtp}>
          Send OTP
        </button>
        <div id="recaptcha-container"></div>
        <div className="form-group mb-3">
          <label>Enter OTP</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
