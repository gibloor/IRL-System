import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/config';

interface GoalAttributes {
  id: number;
  title: string;
  userId: number;
  isMain: boolean;
  isInactive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GoalCreationAttributes extends Optional<GoalAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

interface GoalInstance extends Model<GoalAttributes, GoalCreationAttributes>, GoalAttributes {}

const Goal = sequelize.define<GoalInstance>('Goal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  isMain: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isInactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'goals'
});

export default Goal;
export type { GoalInstance, GoalAttributes, GoalCreationAttributes };