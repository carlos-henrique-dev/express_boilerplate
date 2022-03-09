import { Entity, Property } from '@mikro-orm/core';
import { BaseModel } from './base.model';

@Entity()
export class Role extends BaseModel {
  @Property({})
  name!: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
