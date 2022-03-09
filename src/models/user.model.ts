import { Entity, Property } from '@mikro-orm/core';
import { BaseModel } from './base.model';

@Entity()
export class User extends BaseModel {
  @Property({})
  name!: string;

  @Property()
  email!: string;

  constructor(name: string, email: string) {
    super();

    this.name = name;
    this.email = email;
  }
}
