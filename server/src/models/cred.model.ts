import {Entity, model, property} from '@loopback/repository';

@model()
export class Cred extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;


  constructor(data?: Partial<Cred>) {
    super(data);
  }
}

export interface CredRelations {
  // describe navigational properties here
}

export type CredsWithRelations = Cred & CredRelations;
