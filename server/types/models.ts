import type { UserInstance, UserAttributes } from '../models/user';
import type { RoleInstance, RoleAttributes } from '../models/role';
import type { CharacterClassInstance, CharacterClassAttributes } from '../models/characterClass';

export interface UserWithRelations extends UserInstance {
  Role?: RoleInstance;
  CharacterClass?: CharacterClassInstance;
}

export interface TokenPayload {
  id: number;
  email: string;
  role: string;
}

export type {
  UserInstance,
  RoleInstance,
  CharacterClassInstance,
  UserAttributes,
  RoleAttributes,
  CharacterClassAttributes,
};