// API URL
const API_URL = 'http://localhost:3000/api/clients';

// Controller functions
async function createOrUpdateClient(clientData, isEditing = false) {
    try {
        const url = isEditing ? `${API_URL}/${clientData.cedula}` : API_URL;
        const method = isEditing ? 'PATCH' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error('Error processing client');
        }

        await loadClients();
        resetForm();
        alert(isEditing ? 'Client updated successfully!' : 'Client created successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

async function loadClients() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        renderClients(data.data);
    } catch (error) {
        console.error('Error loading clients:', error);
        alert('Error loading clients');
    }
}

async function searchClient() {
    const cedula = document.getElementById('searchCedula').value;
    if (!cedula) {
        await loadClients();
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${cedula}`);
        const data = await response.json();
        
        if (response.ok) {
            renderClients([data.data]);
        } else {
            alert('Client not found');
        }
    } catch (error) {
        console.error('Error searching client:', error);
        alert('Error searching client');
    }
}

async function deleteClient(cedula) {
    if (!confirm('Are you sure you want to delete this client?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${cedula}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error deleting client');
        }

        await loadClients();
        alert('Client deleted successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

// Load clients when page loads
document.addEventListener('DOMContentLoaded', loadClients);