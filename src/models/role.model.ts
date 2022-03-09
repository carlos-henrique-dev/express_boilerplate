import { BeforeCreate, Entity, Property } from '@mikro-orm/core';
import { BaseModel } from './base.model';
import slugify from 'slug';

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

  @BeforeCreate()
  hashPassword = async (role: any) => {
    const { entity } = role;
    const { slug } = entity;
    const newSlug = slugify(slug, '_');

    entity.slug = newSlug;
  };
}
