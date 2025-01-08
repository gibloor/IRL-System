import User from './user';
import Role from './role';
import CharacterClass from './characterClass';
import Goal from './goal';
import Task from './task';
import TaskProgress from './taskProgress';

export const setupAssociations = () => {
  User.belongsTo(Role, { foreignKey: 'roleId' });
  Role.hasMany(User, { foreignKey: 'roleId' });

  User.belongsTo(CharacterClass, { foreignKey: 'classId' });
  CharacterClass.hasMany(User, { foreignKey: 'classId' });

  User.hasMany(Goal, { foreignKey: 'userId' });
  Goal.belongsTo(User, { foreignKey: 'userId' });

  Goal.hasMany(Task, { foreignKey: 'goalId' });
  Task.belongsTo(Goal, { foreignKey: 'goalId' });

  Task.hasMany(TaskProgress, { foreignKey: 'taskId' });
  TaskProgress.belongsTo(Task, { foreignKey: 'taskId' });
};