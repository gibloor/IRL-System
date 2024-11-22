import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '../database/config';

interface RoleAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

interface RoleInstance extends Model<RoleAttributes, RoleCreationAttributes>, RoleAttributes {}

const Role = sequelize.define<RoleInstance>('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'roles'
});

export default Role;
export type { RoleInstance, RoleAttributes, RoleCreationAttributes };