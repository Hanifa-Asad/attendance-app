import { createUserWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { auth } from "./firebase-config.js";


// Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

// Signup form
document.getElementById("adminSignupForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const password = document.getElementById("adminPassword").value;

  // Validate email and password
  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Please enter a valid email address.",
    });
    return;
  }

  if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Weak Password",
      text: "Password must be at least 8 characters, include uppercase, lowercase, and a number.",
    });
    return;
  }

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Send email verification
      sendEmailVerification(user)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Signup Successful",
            text: "A verification email has been sent to your email address. Please verify before logging in.",
          });
          window.location.href = "dashboard.html";
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Email Verification Failed",
            text: error.message,
          });
        });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    });
});

// Google Signup
document.getElementById("googleBtn").addEventListener("click", () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      Swal.fire({
        icon: "success",
        title: "Signup Successful",
        text: "You have signed up successfully with your Google account.",
      });
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Signup with Google Failed",
        text: error.message,
      });
    });
});

