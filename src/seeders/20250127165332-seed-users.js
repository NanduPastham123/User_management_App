const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash the passwords
    const hashedPassword1 = await bcrypt.hash('plainpassword123', 10); // Replace with the actual plain password
    const hashedPassword2 = await bcrypt.hash('plainpassword456', 10); // Replace with the actual plain password

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          //role: 'admin',
          password: hashedPassword1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          //role: 'user',
          password: hashedPassword2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
