import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '../database/config';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  age?: number;
  gender?: 'male' | 'female';
  lastRunDistance?: number;
  lastDumbbellWeight?: number;
  roleId: number;
  classId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female'),
    allowNull: true,
  },
  lastRunDistance: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
  },
  lastDumbbellWeight: {
    type: DataTypes.DECIMAL(4, 2),
    allowNull: true,
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'character_classes',
      key: 'id',
    },
  },
}, {
  tableName: 'users'
});

export default User;
export type { UserInstance, UserAttributes, UserCreationAttributes };