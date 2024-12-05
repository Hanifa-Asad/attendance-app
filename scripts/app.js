import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    Swal.fire({
      title: 'Success!',
      text: 'Login Successful!',
      icon: 'success',
      confirmButtonText: 'Okay'
    }).then(() => {
      window.location.href = "dashboard.html";
    });
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
});
// Assuming this file is part of your module
document.addEventListener("DOMContentLoaded", () => {
    const signupButton = document.getElementById("signupButton");

    if (signupButton) {
        signupButton.addEventListener("click", () => {
            // Navigate to the signup page
            window.location.href = "/signup.html"; // Adjust the path if necessary
        });
    }
});

// import Swal from 'sweetalert2';

let credentials = document.getElementById('credentials');
if (credentials) {
    credentials.addEventListener("click", () => {
        Swal.fire('Admin : admin@smit.edu.pk\n Password : Iamadmin@123');
    });
}
