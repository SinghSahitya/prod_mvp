import React, { useState } from "react";
import axios from "axios";
import firebase from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    gstin: "",
    businessName: "",
    ownerName: "",
    contact: "",
    location: "",
    businessType: "",
  });
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate(); 
  const sendOtp = async () => {
    if (!formData.contact) {
      alert("Please enter a phone number!");
      return;
    }

    const appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });

    try {
      const confirmationResult = await firebase
        .auth()
        .signInWithPhoneNumber(formData.contact, appVerifier);

      setVerificationId(confirmationResult.verificationId);
      setIsOtpSent(true);
      alert("OTP sent to your phone!");
    } catch (error) {
      console.error("Error sending OTP: ", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleSignup = async () => {
    if (!otp || !verificationId) {
      alert("Please enter the OTP!");
      return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);

    try {
      const userCredential = await firebase.auth().signInWithCredential(credential);

      const idToken = await userCredential.user.getIdToken();

      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        ...formData,
        idToken,
      });
      localStorage.setItem("token", response.data.token);
      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Error signing up: ", error);
      alert("Failed to sign up. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sign Up</h2>
      <div className="card p-4 mt-3">
        <div className="mb-3">
          <label htmlFor="gstin" className="form-label">
            GSTIN
          </label>
          <input
            type="text"
            className="form-control"
            id="gstin"
            value={formData.gstin}
            onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="businessName" className="form-label">
            Business Name
          </label>
          <input
            type="text"
            className="form-control"
            id="businessName"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ownerName" className="form-label">
            Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="contact"
            placeholder="+1XXXXXXXXXX"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            disabled={isOtpSent}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>
        {isOtpSent && (
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">
              OTP
            </label>
            <input
              type="text"
              className="form-control"
              id="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        )}
        <div id="recaptcha-container"></div>
        {!isOtpSent ? (
          <button className="btn btn-primary w-100" onClick={sendOtp}>
            Send OTP
          </button>
        ) : (
          <button className="btn btn-success w-100" onClick={handleSignup}>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default Signup;
