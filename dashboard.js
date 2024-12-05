import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  query,
  deleteDoc,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// import {
//   getStorage,

//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js";

const cloudName = 'dcx5wyfwe';
const unsignedUploadPreset = 'ml_default';

  
const firebaseConfig = {
  apiKey: "AIzaSyBeYRQxPs9qnB7SaMoIsna--Y-5HqPMf7g",
  authDomain: "attendance-app-90b52.firebaseapp.com",
  projectId: "attendance-app-90b52",
  storageBucket: "attendance-app-90b52.firebasestorage.app",
  messagingSenderId: "977563714964",
  appId: "1:977563714964:web:da789cd4a09a55e416fb81",
  measurementId: "G-1PJZ29JWW1"
};
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);


// let rollNumberAtt = document.getElementById('rollNumberAtt');
// let AttendanceBtn = document.getElementById('AttendanceBtn');
// AttendanceBtn.addEventListener("click", () => {
//   if (rollNumberAtt.value.trim() == "") {
//     swal("Please Enter a Roll Number");
//   }
//   else {
//     swal({
//       title: `Attendance Marked`,
//       icon: "success",
//       button: "Okay",
//     });

//   }
// })
// Mark Attendance function
// AttendanceBtn.addEventListener("click", async () => {
//   const rollNumberAtt = document.getElementById('rollNumberAtt').value.trim();

//   if (rollNumberAtt == "") {
//     swal("Please Enter a Roll Number");
//     return;
//   }

//   try {
//     // Fetch student data using roll number
//     const studentRef = doc(db, "studentData", rollNumberAtt); // Assuming rollNum is the doc ID
//     const studentDoc = await getDoc(studentRef);

//     if (studentDoc.exists()) {
//       const studentData = studentDoc.data();

//       // Create attendance record
//       const attendanceData = {
//         rollNum: studentData.rollNum,
//         studentName: studentData.studentName,
//         status: "Present", // You can make this dynamic based on input, e.g., a toggle button
//         classInfo: {
//           timing: result1,
//           schedule: result2,
//           current_teacher: result3,
//           section: result4,
//           course: result5,
//           batch: result6,
//         },
//         timestamp: serverTimestamp(), // Firebase server timestamp
//       };

//       // Save attendance record in Firestore
//       await addDoc(collection(db, "attendance"), attendanceData);

//       swal({
//         title: `Attendance Marked for ${studentData.studentName}`,
//         icon: "success",
//         button: "Okay",
//       });
//     } else {
//       swal("No student found with this roll number!");
//     }
//   } catch (error) {
//     console.error("Error marking attendance: ", error);
//     swal("Error marking attendance. Please try again.");
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  const AttendanceBtn = document.getElementById('AttendanceBtn');
  if (AttendanceBtn) {
    AttendanceBtn.addEventListener("click", async () => {
      const rollNumberAtt = document.getElementById('rollNumberAtt').value.trim();

      if (rollNumberAtt == "") {
        swal("Please Enter a Roll Number");
        return;
      }

      try {
        // Fetch student data and mark attendance
        const studentRef = doc(db, "studentData", rollNumberAtt); // Assuming rollNum is the doc ID
        const studentDoc = await getDoc(studentRef);

        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          const attendanceData = {
            rollNum: studentData.rollNum,
            studentName: studentData.studentName,
            status: "Present", // You can make this dynamic based on input
            classInfo: {
              timing: result1,
              schedule: result2,
              current_teacher: result3,
              section: result4,
              course: result5,
              batch: result6,
            },
            timestamp: serverTimestamp(),
          };

          await addDoc(collection(db, "attendance"), attendanceData);
          swal({ title: `Attendance Marked for ${studentData.studentName}`, icon: "success", button: "Okay" });
        } else {
          swal("No student found with this roll number!");
        }
      } catch (error) {
        console.error("Error marking attendance: ", error);
        swal("Error marking attendance. Please try again.");
      }
    });
  } else {
    console.error("Attendance button not found.");
  }
});


// data base 





// let count = 0;
// let obj = {};

  let getClassValue = async () => {

    let dropdown1 = document.getElementById("timing")
    let result1 = dropdown1.options[dropdown1.selectedIndex].value;

    let dropdown2 = document.getElementById("schedule")
    let result2 = dropdown2.options[dropdown2.selectedIndex].value;

    let dropdown3 = document.getElementById("teacher")
    let result3 = dropdown3.options[dropdown3.selectedIndex].value;

    let dropdown4 = document.getElementById("section")
    let result4 = dropdown4.options[dropdown4.selectedIndex].value;

    let dropdown5 = document.getElementById("course")
    let result5 = dropdown5.options[dropdown5.selectedIndex].value;
    console.log(result5)
    // console.log(result4)

    let dropdown6 = document.getElementById("batch")
    let result6 = dropdown6.options[dropdown6.selectedIndex].value;
    // console.log(result5)

    if (result1 != 0 && result2 != 0 && result3 != 0 && result4 != 0 && result5 != 0) {
      //  && dropdown2 != "0" && dropdown3 != "0" && dropdown4 != "0" && dropdown5 != "0") {
      console.log("hi")
      const docRef = await addDoc(collection(db, "classList"), {
        timing: result1,
        schedule: result2,
        current_teacher: result3,
        section: result4,
        course: result5,
        batch: result6
      });
      swal(`Class Added Successfully`)
    }

  }

  const colRef = collection(db, "classList");
let classData = document.getElementById('classData');
console.log(classData)
  getDocs(colRef)
  .then(async(value)=>{
      await value.docs.forEach((docsValue)=>{
          console.log(docsValue.data())
          classData.innerHTML+=`<option>
             ${docsValue.data().batch}
            ${docsValue.data().timing}
             ${docsValue.data().section}
            ${docsValue.data().current_teacher}
            ${docsValue.data().schedule}
          
          </option>`
      })
  })
  

  window.getClassValue = getClassValue;

  // Event listener for DOM content loaded
document.addEventListener("DOMContentLoaded", function () {
  // Your JavaScript code goes here, including event listeners

  // Event listeners for file upload
  const fileSelect = document.getElementById("fileSelect");
  const fileElem = document.getElementById("fileElem");
  const urlSelect = document.getElementById("urlSelect");
  const dropbox = document.getElementById("dropbox");

  // Check if elements exist before adding event listeners
  if (fileSelect) {
      fileSelect.addEventListener("click", function (e) {
          if (fileElem) {
              fileElem.click();
          }
          e.preventDefault(); // prevent navigation to "#"
      }, false);
  }

  if (urlSelect) {
      urlSelect.addEventListener("click", function (e) {
          uploadFile('https://res.cloudinary.com/dkkqldaic/image/upload/sample.jpg');
          e.preventDefault(); // prevent navigation to "#"
      }, false);
  }

  // Drag and drop events
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);
});

// Drag and drop events
function dragenter(e) {
e.stopPropagation();
e.preventDefault();
}

function dragover(e) {
e.stopPropagation();
e.preventDefault();
}

function drop(e) {
e.stopPropagation();
e.preventDefault();

const dt = e.dataTransfer;
const files = dt.files;
handleFiles(files);  // Handle dropped files
}

// Handle file selection
const handleFiles = function (files) {
for (let i = 0; i < files.length; i++) {
  uploadFile(files[i]);  // Call the function to upload the file
}
};

// Upload file to Cloudinary and get the URL
async function uploadFile(file) {
const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
const fd = new FormData();
fd.append('upload_preset', unsignedUploadPreset);
fd.append('tags', 'browser_upload');  // Optional tag for Cloudinary
fd.append('file', file);

try {
  const response = await fetch(url, {
    method: 'POST',
    body: fd,
  });
  const data = await response.json();
  const uploadedUrl = data.secure_url;
  return uploadedUrl;  // Return the uploaded URL
} catch (error) {
  console.error('Error uploading the file:', error);
  throw error;  // Rethrow error to be caught in addStudent
}
}

// Your existing addStudent function
let addStudent = async (event) => {
event.preventDefault();  // Prevent form submission

let studentData = document.querySelectorAll("#v-pills-tabContent input");
let courses = document.getElementById("classData");
console.log(courses.value);

let obj = {};

// Prepare student data
for (let i = 0; i < studentData.length; i++) {
  console.log(studentData[i].value);
  if (studentData[i].value.trim() == "") {
    studentData[i].style.border = "1px solid red";
  } else {
    obj = {
      studentName: document.getElementById("studentName").value,
      fatherName: document.getElementById("fatherName").value,
      rollNum: document.getElementById("rollNum").value,
      contactNo: document.getElementById("contact").value,
      CNIC: document.getElementById("cnic").value,
      course: courses.value,  // Added course
    };

    setTimeout(() => {
      studentData[i].style.border = "1px solid black";
    }, 2000);
  }
}

// Handle the file upload using Cloudinary
let studentPic = document.getElementById("studentPic").files[0];  // Get the file input field
console.log(studentPic);

if (studentPic) {
  try {
    // Upload the file and get the URL
    const uploadedUrl = await uploadFile(studentPic);
    const transformedURL = uploadedUrl.replace("/upload/", "/upload/w_150,c_scale/");

    // Add the image URL to the student data object
    obj.url = transformedURL;  // Assign the image URL to the student object
    console.log(obj);

    // Add student data to Firebase Firestore
    const docRef = await addDoc(collection(db, "studentData"), obj);
    swal(`Student Added Successfully`);
    console.log("Document written with ID: ", docRef.id);

  } catch (error) {
    console.error('Error uploading the file:', error);
  }
} else {
  console.log("No file selected");
}
}

// Show uploaded images from Firestore
let showPreview = () => {
const q = query(collection(db, "studentData"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  document.getElementById("tableStudent").innerHTML = `
    <tr>
      <th>S.No</th>
      <th>Roll No</th>
      <th>Student Name</th>
      <th>Father Name</th>
      <th>Contact No</th>
      <th>CNIC No</th>
      <th>Course</th>
      <th>Delete</th>
      <th>Edit</th>
    </tr>
  `;
  let count = 0;
  querySnapshot.forEach((doc) => {
    document.getElementById("tableStudent").innerHTML += `
      <tr>
        <td>${++count}</td>
        <td>${doc.data().rollNum}</td>
        <td>${doc.data().studentName}</td>
        <td>${doc.data().fatherName}</td>
        <td>${doc.data().contactNo}</td>
        <td>${doc.data().CNIC}</td>
        <td>${doc.data().course}</td>
        <td><button onclick="deleteStudent('${doc.id}')">Delete</button></td>
        <td><button onclick="editStudent('${doc.id}','${doc.data().studentName}','${doc.data().fatherName}','${doc.data().rollNum}','${doc.data().contactNo}','${doc.data().CNIC}','${doc.data().course}')" class="btn-close" data-bs-dismiss="modal" aria-label="Close">Edit</button></td>
      </tr>
    `;
  });
});
};
showPreview();


// Function to delete student from Firestore
let deleteStudent = async (document) => {
  await deleteDoc(doc(db, "studentData", document));
  console.log(document);
};

window.addStudent = addStudent;
window.deleteStudent = deleteStudent;
let signout = document.getElementById('signout');
// console.log(signout)
signout.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log(signOut)
    window.location.replace('index.html')
  }).catch((error) => {
    // An error happened.
  });
})

//  window.editStudent = editStudent;
window.AttendanceBtn = AttendanceBtn;