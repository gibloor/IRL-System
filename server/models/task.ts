import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/config';

interface TaskAttributes {
  id: number;
  goalId: number;
  title: string;
  type: 'daily' | 'weekly' | 'active';
  times_per_week: number;
  target_per_time: number;
  schedule_days?: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'id' | 'schedule_days' | 'createdAt' | 'updatedAt'> {}

interface TaskInstance extends Model<TaskAttributes, TaskCreationAttributes>, TaskAttributes {}

const Task = sequelize.define<TaskInstance>('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  goalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'goals',
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('daily', 'weekly', 'active'),
    allowNull: false,
  },
  times_per_week: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  target_per_time: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  schedule_days: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
}, {
  tableName: 'tasks'
});

export default Task;
export type { TaskInstance, TaskAttributes, TaskCreationAttributes };