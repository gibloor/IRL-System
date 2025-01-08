'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('goals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
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
      isMain: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isInactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      goalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'goals',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM('daily', 'weekly', 'active'),
        allowNull: false,
      },
      times_per_week: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      target_per_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      schedule_days: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true,
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

    await queryInterface.createTable('task_progress', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tasks',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      current_value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

    await queryInterface.addIndex('goals', ['userId']);
    await queryInterface.addIndex('goals', ['userId', 'isMain']);
    await queryInterface.addIndex('tasks', ['goalId']);
    await queryInterface.addIndex('task_progress', ['taskId', 'createdAt']);

    const playerId = await queryInterface.rawSelect('users', {
      where: { username: 'player' },
    }, ['id']);

    const [mainGoal] = await queryInterface.bulkInsert('goals', [
      {
        title: 'Become a moneybag',
        userId: playerId,
        isMain: true,
        isInactive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    const [englishGoal, webDevGoal, gameDevGoal] = await queryInterface.bulkInsert('goals', [
      {
        title: 'Upgrade english to strong B2',
        userId: playerId,
        isMain: false,
        isInactive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Upgrade Web-developer skills',
        userId: playerId,
        isMain: false,
        isInactive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Grow in game development',
        userId: playerId,
        isMain: false,
        isInactive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    await queryInterface.bulkInsert('tasks', [
      {
        goalId: englishGoal.id,
        title: 'Read a book',
        type: 'active',
        times_per_week: 1,
        target_per_time: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: englishGoal.id,
        title: 'Read a second book',
        type: 'active',
        times_per_week: 1,
        target_per_time: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: englishGoal.id,
        title: 'Repeat words',
        type: 'daily',
        times_per_week: 7,
        target_per_time: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: englishGoal.id,
        title: 'Sing a Tom Cardy song on english',
        type: 'daily',
        times_per_week: 7,
        target_per_time: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: englishGoal.id,
        title: 'Stream on english',
        type: 'active',
        times_per_week: 3,
        target_per_time: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('tasks', [
      {
        goalId: webDevGoal.id,
        title: 'Read more about React.memo',
        type: 'active',
        times_per_week: 1,
        target_per_time: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: webDevGoal.id,
        title: 'Add HR to your contacts on LinkedIn',
        type: 'weekly',
        times_per_week: 1,
        target_per_time: 1,
        schedule_days: [1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: webDevGoal.id,
        title: 'Review options on upwork',
        type: 'weekly',
        times_per_week: 3,
        target_per_time: 1,
        schedule_days: [1, 3, 5],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        goalId: webDevGoal.id,
        title: 'Work on own project',
        type: 'active',
        times_per_week: 3,
        target_per_time: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    await queryInterface.bulkInsert('tasks', [
      {
        goalId: gameDevGoal.id,
        title: 'Work on own game',
        type: 'active',
        times_per_week: 3,
        target_per_time: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    const tasks = await queryInterface.sequelize.query(
      `SELECT id, title FROM tasks`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const bookTask = tasks.find(t => t.title === 'Read a book');
    const streamTask = tasks.find(t => t.title === 'Stream on english');

    if (bookTask) {
      await queryInterface.bulkInsert('task_progress', [
        {
          taskId: bookTask.id,
          current_value: 1,
          is_completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }

    if (streamTask) {
      await queryInterface.bulkInsert('task_progress', [
        {
          taskId: streamTask.id,
          current_value: 4,
          is_completed: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('task_progress', ['taskId', 'createdAt']);
    await queryInterface.removeIndex('tasks', ['goalId']);
    await queryInterface.removeIndex('goals', ['userId', 'isMain']);
    await queryInterface.removeIndex('goals', ['userId']);

    await queryInterface.dropTable('task_progress');
    await queryInterface.dropTable('tasks');
    await queryInterface.dropTable('goals');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS enum_tasks_type;');
  }
};