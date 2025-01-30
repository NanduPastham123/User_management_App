'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add unique index for email
    await queryInterface.addIndex("Users", ["email"], {
      unique: true, // Unique index for email
      name: "users_email_unique_index", // Optional: Name your index
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove the unique index for email
    await queryInterface.removeIndex("Users", "users_email_unique_index");

    // Remove the regular index for role
    await queryInterface.removeIndex("Users", "users_role_index");
  },
};
