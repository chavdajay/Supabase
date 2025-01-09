const supabase = require('../config/db');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Error fetching users' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const newUser = req.body;

    // Basic validation
    if (!newUser.name || !newUser.email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: newUser.name,
        email: newUser.email,
      }]);

    if (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ message: 'Error adding user' });
    }

    res.status(201).json({ message: 'User created successfully', user: data });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Error adding user' });
  }
};

// Update an existing user via PUT request
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure at least one field to update is provided
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    // Perform the update and select the updated rows
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select('*'); // Force Supabase to return the updated rows

    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Error updating user', error: error.message });
    }

    // Check if any rows were updated
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', updatedUser: data });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// Delete an existing user via DELETE request
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to delete the user
    const { data, error, count } = await supabase
      .from('users')
      .delete()
      .eq('id', id)
      .select('*'); // Force Supabase to return the deleted rows

    if (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Error deleting user', error: error.message });
    }

    // Check if rows were affected
    if (!data || data.length === 0) {
      // Alternatively, you could also use `count` if supported
      return res.status(404).json({ message: 'User not found' });
    }

    // Return success if the user was deleted
    res.status(200).json({ message: 'User deleted successfully', deletedUser: data });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};





