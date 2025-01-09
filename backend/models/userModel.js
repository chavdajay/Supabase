const supabase = require('../config/db');

const UserModel = {
  createTable: async () => {
    const { data, error } = await supabase.rpc('execute_sql', {
      sql: `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      `
    });

    if (error) {
      console.error('Error creating table:', error.message);
    } else {
      console.log('Users table created successfully.');
    }
  },
};

module.exports = UserModel;
