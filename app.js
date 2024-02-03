// app.js

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);



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
