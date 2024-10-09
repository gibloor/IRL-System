const bcrypt = require('bcrypt');

const addUser = async (queryInterface, username, email, password, role_id) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await queryInterface.bulkInsert('users', [{
    username,
    email,
    password: hashedPassword,
    role_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]);
};

module.exports = {
  addUser,
};
