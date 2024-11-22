import User from './user';
import Role from './role';
import CharacterClass from './characterClass';

export const setupAssociations = () => {
  User.belongsTo(Role, { foreignKey: 'roleId' });
  Role.hasMany(User, { foreignKey: 'roleId' });

  User.belongsTo(CharacterClass, { foreignKey: 'classId' });
  CharacterClass.hasMany(User, { foreignKey: 'classId' });
};