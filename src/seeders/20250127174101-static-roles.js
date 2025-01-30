'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting initial roles into the Roles table
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'admin', // Role name
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'user', // Role name
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'guest', // Role name
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // Reverting the changes in case of rollback
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
