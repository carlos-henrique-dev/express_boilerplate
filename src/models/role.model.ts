import { Entity, Property } from '@mikro-orm/core';
import { BaseModel } from './base.model';

@Entity()
export class Role extends BaseModel {
  @Property({ nullable: false })
  name!: string;

  @Property({ unique: true, nullable: false })
  slug!: string;

  constructor(name: string, slug: string) {
    super();

    this.name = name;
    this.slug = slug;
  }
}
