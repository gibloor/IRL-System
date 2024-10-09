'use strict';

const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    await queryInterface.bulkInsert('roles', [
      { name: 'player', createdAt: new Date(), updatedAt: new Date() },
      { name: 'administrator', createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });

    const playerRole = await queryInterface.rawSelect('roles', {
      where: { name: 'player' },
    }, ['id']);
    
    const adminRole = await queryInterface.rawSelect('roles', {
      where: { name: 'administrator' },
    }, ['id']);

    await queryInterface.bulkInsert('users', [
      {
        username: 'player',
        email: 'player@gmail.com',
        password: await hashPassword('player'),
        roleId: playerRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: await hashPassword('admin'),
        roleId: adminRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('roles');
  }
};