// Sample data (replace with data from your database)
const groupsData = [
    { id: 1, members: ["Student1", "Student2", "Student3"] },
    // ... other groups
];

// Function to render groups on the webpage
function renderGroups(groups) {
    const appContainer = document.getElementById('app');
    const groupList = document.createElement('div');
    groupList.className = 'group-list';

    groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';

        const membersList = document.createElement('ul');
        group.members.forEach(member => {
            const listItem = document.createElement('li');
            listItem.textContent = member;
            membersList.appendChild(listItem);
        });

        groupCard.innerHTML = `
            <h3>Group ${group.id}</h3>
            <strong>Members:</strong>
            ${membersList.outerHTML}
            <button onclick="joinGroup(${group.id})">Join Group</button>
        `;

        groupList.appendChild(groupCard);
    });

    appContainer.appendChild(groupList);
}

// Function to simulate joining a group (replace with actual backend logic)
function joinGroup(groupId) {
    alert(`You have joined Group ${groupId}`);
}

// Render groups when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderGroups(groupsData);
});
