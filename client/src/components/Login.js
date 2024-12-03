import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import firebase from "./firebaseConfig";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number!");
      return;
    }
  
    try {
      // Check if the phone number exists
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        phoneNumber,
      });
  
      if (response.data.message === "User found, OTP can be sent") {
        // Proceed to send OTP
        const appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
          size: "invisible",
        });
  
        const confirmationResult = await firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier);
  
        setVerificationId(confirmationResult.verificationId);
        setIsOtpSent(true);
        alert("OTP sent to your phone!");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("No such phone number exists. Please sign up.");
      } else {
        console.error("Error sending OTP: ", error);
        alert("Failed to send OTP. Try again.");
      }
    }
  };
  

  const verifyOtp = async () => {
    if (!otp || !verificationId) {
      alert("Please enter the OTP!");
      return;
    }

    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);

    try {
      const userCredential = await firebase.auth().signInWithCredential(credential);

      const idToken = await userCredential.user.getIdToken();

      const response = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        phoneNumber,
        idToken,
      });
      localStorage.setItem("token", response.data.token); 
      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Error verifying OTP: ", error);
      alert("Failed to verify OTP. Try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <div className="card p-4 mt-3">
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="+1XXXXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isOtpSent}
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
          <button className="btn btn-success w-100" onClick={verifyOtp}>
            Verify OTP
          </button>
        )}
      </div>
      <div className="text-center mt-3">
        <p>
          Don't have an account?{" "}
          <button className="btn btn-link p-0" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;