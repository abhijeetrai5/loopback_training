import {belongsTo,Entity, model, property} from '@loopback/repository';
import {Role} from '.';
import {SoftDeleteEntity} from 'loopback4-soft-delete';

@model({
  settings: {
    foreignKeys: {
      fk_user_role: {
        name: 'fk_user_role',
        entity: 'Role',
        entityKey: 'id',
        foreignKey: 'role',
      }
    },
  }
})
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @belongsTo(() => Role, {keyTo: 'id', name: 'user_role'})
  role: number;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  @property({
    type: 'date',
  })
  modified_at?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
