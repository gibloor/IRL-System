import { DataTypes, Model, Optional } from 'sequelize';

import sequelize from '../database/config';

interface CharacterClassAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CharacterClassCreationAttributes extends Optional<CharacterClassAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

interface CharacterClassInstance extends Model<CharacterClassAttributes, CharacterClassCreationAttributes>, CharacterClassAttributes {}

const CharacterClass = sequelize.define<CharacterClassInstance>('CharacterClass', {
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
  tableName: 'character_classes'
});

export default CharacterClass;
export type { CharacterClassInstance, CharacterClassAttributes, CharacterClassCreationAttributes };