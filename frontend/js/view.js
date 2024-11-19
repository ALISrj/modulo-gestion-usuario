// View functions
function renderClients(clients) {
    const clientsList = document.getElementById('clientsList');
    clientsList.innerHTML = '';

    clients.forEach(client => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${client.fullName}</td>
            <td class="px-6 py-4 whitespace-nowrap">${client.cedula}</td>
            <td class="px-6 py-4 whitespace-nowrap">${client.username}</td>
            <td class="px-6 py-4 whitespace-nowrap">${client.email}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="editClient('${client.cedula}')" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button onclick="deleteClient('${client.cedula}')" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
        `;
        clientsList.appendChild(row);
    });
}

function resetForm() {
    document.getElementById('clientForm').reset();
    document.getElementById('isEditing').value = 'false';
}

async function editClient(cedula) {
    try {
        const response = await fetch(`${API_URL}/${cedula}`);
        const { data } = await response.json();
        
        document.getElementById('fullName').value = data.fullName;
        document.getElementById('cedula').value = data.cedula;
        document.getElementById('username').value = data.username;
        document.getElementById('email').value = data.email;
        document.getElementById('password').value = ''; // Password is not returned from API
        document.getElementById('isEditing').value = 'true';
        
        // Disable cedula field when editing
        document.getElementById('cedula').disabled = true;
    } catch (error) {
        console.error('Error loading client for edit:', error);
        alert('Error loading client data');
    }
}

// Form submission handler
document.getElementById('clientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const clientData = {
        fullName: document.getElementById('fullName').value,
        cedula: document.getElementById('cedula').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    const isEditing = document.getElementById('isEditing').value === 'true';
    await createOrUpdateClient(clientData, isEditing);
});