'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the 'role' column from the Users table
    await queryInterface.removeColumn('Users', 'role');
  },

  down: async (queryInterface, Sequelize) => {
    // Add the 'role' column back to the Users table
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: true, // Adjust according to your original column definition
    });
  }
};
