'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Adding 'role' column to the Users table
    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING,
      allowNull: true, // Change this depending on whether the field can be null
    });

    // Adding 'password' column to the Users table
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: true, // Change this depending on whether the field can be null
    });
  },

  async down(queryInterface, Sequelize) {
    // Removing 'role' column from the Users table
    await queryInterface.removeColumn('Users', 'role');

    // Removing 'password' column from the Users table
    await queryInterface.removeColumn('Users', 'password');
  },
};
