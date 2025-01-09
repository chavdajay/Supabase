import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser } from '../api/userApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);  // Added error state to handle errors

  useEffect(() => {
    loadUsers();
  }, []);

  // Fetch users from API
  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
      setError(null); // Clear error if the users are successfully fetched
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  // Handle form submit (Create or Update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors
    try {
      if (editId) {
        await updateUser(editId, form); // Update user
      } else {
        await createUser(form); // Create new user
      }
      setForm({ name: '', email: '' });
      setEditId(null);
      loadUsers(); // Reload users list after create/update
    } catch (err) {
      setError('Error submitting the form');
    }
  };

  // Handle editing user
  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user.id);
  };

  // Handle deleting user
  const handleDelete = async (id) => {
    setError(null); // Reset any previous errors
    try {
      await deleteUser(id); // Delete user
      loadUsers(); // Reload users list after delete
    } catch (err) {
      setError('Error deleting user');
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">{editId ? 'Update' : 'Create'}</button>
      </form>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No users found</p>
        )}
      </ul>
    </div>
  );
};

export default UserManagement;
