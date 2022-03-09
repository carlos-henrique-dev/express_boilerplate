import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseModel {
  @PrimaryKey()
  id!: number;

  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), nullable: true, default: null })
  updatedAt: Date | null = null;

  @Property({ nullable: true, default: null })
  deletedAt: Date | null = null;

  @Property({ default: false })
  deleted!: boolean;
}
