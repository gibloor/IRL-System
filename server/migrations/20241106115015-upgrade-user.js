'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'age', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.ENUM('male', 'female'),
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'lastRunDistance', {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'lastDumbbellWeight', {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: true,
    });

    await queryInterface.createTable('character_classes', {
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

    const existingClasses = await queryInterface.sequelize.query(
      `SELECT name FROM character_classes;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const existingClassNames = existingClasses.map(c => c.name);

    const classesToAdd = [
      { 
        name: 'custom',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'programmer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ].filter(c => !existingClassNames.includes(c.name));

    if (classesToAdd.length > 0) {
      await queryInterface.bulkInsert('character_classes', classesToAdd);
    }

    await queryInterface.addColumn('users', 'classId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'character_classes',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.createTable('exercise_types', {
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
      measurementUnit: {
        type: Sequelize.STRING,
        allowNull: false,
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

    const existingTypes = await queryInterface.sequelize.query(
      `SELECT name FROM exercise_types;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const existingTypeNames = existingTypes.map(t => t.name);

    const typesToAdd = [
      { 
        name: 'running',
        measurementUnit: 'km',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        name: 'dumbbell',
        measurementUnit: 'kg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ].filter(t => !existingTypeNames.includes(t.name));

    if (typesToAdd.length > 0) {
      await queryInterface.bulkInsert('exercise_types', typesToAdd);
    }

    await queryInterface.createTable('exercise_records', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      exerciseTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercise_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      value: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
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

    await queryInterface.addIndex('exercise_records', ['userId', 'exerciseTypeId', 'createdAt']);
    await queryInterface.addIndex('users', ['classId']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', ['classId']);
    await queryInterface.removeIndex('exercise_records', ['userId', 'exerciseTypeId', 'createdAt']);

    await queryInterface.dropTable('exercise_records');
    await queryInterface.dropTable('exercise_types');
    
    await queryInterface.removeColumn('users', 'classId');
    await queryInterface.dropTable('character_classes');

    await queryInterface.removeColumn('users', 'gender');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_users_gender;');

    await queryInterface.removeColumn('users', 'age');
    await queryInterface.removeColumn('users', 'lastRunDistance');
    await queryInterface.removeColumn('users', 'lastDumbbellWeight');
  }
};