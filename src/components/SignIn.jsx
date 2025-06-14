import React, { useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../firebase";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome, ${result.user.displayName}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const emailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert(`Welcome, ${result.user.email}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const emailRegister = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      alert(`Registered: ${result.user.email}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendOtp = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: () => {},
      },
      auth
    );

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((confirmationResult) => {
        setConfirmation(confirmationResult);
        alert("OTP sent!");
      })
      .catch((error) => alert(error.message));
  };

  const verifyOtp = () => {
    if (confirmation && otp) {
      confirmation
        .confirm(otp)
        .then((result) => {
          alert(`Welcome, ${result.user.phoneNumber}`);
        })
        .catch(() => alert("Invalid OTP"));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

      {/* Email login */}
      <input
        className="w-full border p-2 mb-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={emailLogin} className="w-full bg-blue-600 text-white py-2 mb-2">
        Login with Email
      </button>
      <button onClick={emailRegister} className="w-full bg-green-600 text-white py-2 mb-4">
        Register with Email
      </button>

      {/* Google login */}
      <button onClick={googleLogin} className="w-full bg-red-500 text-white py-2 mb-4">
        Sign in with Google
      </button>

      {/* Phone login */}
      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="+123456789"
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={sendOtp} className="w-full bg-yellow-500 text-white py-2 mb-2">
        Send OTP
      </button>
      <input
        className="w-full border p-2 mb-2"
        type="text"
        placeholder="Enter OTP"
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOtp} className="w-full bg-indigo-500 text-white py-2">
        Verify OTP
      </button>

      <div id="recaptcha" className="mt-2" />
    </div>
  );
}
