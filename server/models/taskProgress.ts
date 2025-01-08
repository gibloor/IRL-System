import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/config';

interface TaskProgressAttributes {
  id: number;
  taskId: number;
  current_value: number;
  is_completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TaskProgressCreationAttributes extends Optional<TaskProgressAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

interface TaskProgressInstance extends Model<TaskProgressAttributes, TaskProgressCreationAttributes>, TaskProgressAttributes {}

const TaskProgress = sequelize.define<TaskProgressInstance>('TaskProgress', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
  current_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'task_progress'
});

export default TaskProgress;
export type { TaskProgressInstance, TaskProgressAttributes, TaskProgressCreationAttributes };