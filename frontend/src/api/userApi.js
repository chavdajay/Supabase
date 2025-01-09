import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Update with your API URL

// Fetch users from the backend API
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response || error);
    throw new Error('Failed to fetch users');
  }
};

// Create a new user via POST request to the backend API
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error.response || error);
    throw new Error('Failed to create user');
  }
};

// Update an existing user via PUT request to the backend API
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response || error);
    throw new Error('Failed to update user');
  }
};

// Delete an existing user via DELETE request to the backend API
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data; // Ensure response data is returned for feedback
  } catch (error) {
    console.error('Error deleting user:', error.response || error);
    throw new Error('Failed to delete user');
  }
};
