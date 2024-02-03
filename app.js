// app.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNnwbaY1YmDEVCuc9wHCTuUqsWv6G0pkQ",
  authDomain: "adsclass-cc049.firebaseapp.com",
  databaseURL: "https://adsclass-cc049-default-rtdb.firebaseio.com",
  projectId: "adsclass-cc049",
  storageBucket: "adsclass-cc049.appspot.com",
  messagingSenderId: "441096244976",
  appId: "1:441096244976:web:0f38d1f08ac6c5d286fc35",
  measurementId: "G-VKKJKNQK1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const db = firebase.database();

// Function to display groups
function displayGroups() {
  const groupsContainer = document.getElementById('groups-container');

  db.ref('groups').on('value', (snapshot) => {
    groupsContainer.innerHTML = ''; // Clear previous data

    snapshot.forEach((groupSnapshot) => {
      const group = groupSnapshot.val();
      const groupElement = document.createElement('div');
      groupElement.innerHTML = `<p>Group ${group.groupNumber}: ${group.members.length}/3 ${group.members.length === 3 ? 'Full' : 'Available'}</p>`;
      groupsContainer.appendChild(groupElement);
    });
  });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayGroups);


// app.js

// Function to join a group
function joinGroup(groupId, userId) {
  const groupRef = db.ref(`groups/${groupId}/members`);
  groupRef.transaction((members) => {
    if (!members) {
      members = [];
    }

    if (members.length < 3 && members.indexOf(userId) === -1) {
      members.push(userId);
    }

    return members;
  });
}

// Event listener for the join form
document.getElementById('join-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const groupId = document.getElementById('group-id').value;
  const userId = document.getElementById('user-id').value;

  joinGroup(groupId, userId);
});

// Update the displayGroups function to show the join form
function displayGroups() {
  // ... (previous code)

  snapshot.forEach((groupSnapshot) => {
    const group = groupSnapshot.val();
    const groupElement = document.createElement('div');
    groupElement.innerHTML = `<p>Group ${group.groupNumber}: ${group.members.length}/3 ${group.members.length === 3 ? 'Full' : 'Available'}</p>`;
    
    // Display join form if the group is available
    if (group.members.length < 3) {
      groupElement.innerHTML += `
        <form id="join-form">
          <input type="hidden" id="group-id" value="${group.groupNumber}">
          <input type="text" id="user-id" placeholder="Enter your name or ID" required>
          <button type="submit">Join</button>
        </form>`;
    }

    groupsContainer.appendChild(groupElement);
  });
}

// ... (rest of the code)
