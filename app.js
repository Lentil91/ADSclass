// Sample data (replace with data from your database)
let groupsData = [
    { id: 1, status: "Available", members: ["", "", ""] },
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
        group.members.forEach((member, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = member || "Available";
            membersList.appendChild(listItem);
            
            if (!member) {
                listItem.addEventListener('click', () => selectMember(group.id, index));
            }
        });

        groupCard.innerHTML = `
            <h3>Group ${group.id}</h3>
            <strong>Status:</strong> ${group.status}<br>
            <strong>Members:</strong>
            ${membersList.outerHTML}
        `;

        groupList.appendChild(groupCard);
    });

    appContainer.appendChild(groupList);
}

// Function to handle member selection
function selectMember(groupId, index) {
    const memberName = prompt("Enter your name or student ID:");
    if (memberName) {
        groupsData = groupsData.map(group => {
            if (group.id === groupId && group.members[index] === "") {
                group.members[index] = memberName;
                const isFull = group.members.every(member => member !== "");
                group.status = isFull ? "Full" : "Available";
            }
            return group;
        });

        renderGroups(groupsData);
    }
}

// Render groups when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderGroups(groupsData);
});
