import { BeforeCreate, Entity, ManyToOne, Property } from '@mikro-orm/core';
import { PasswordService } from '../utils';
import { BaseModel } from './base.model';
import { Role } from './role.model';

@Entity()
export class User extends BaseModel {
  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: false, unique: true })
  email!: string;

  @Property({ nullable: false })
  password!: string;

  @ManyToOne(() => Role, { nullable: false })
  role!: Role;

  constructor(name: string, email: string) {
    super();

    this.name = name;
    this.email = email;
  }

  @BeforeCreate()
  hashPassword = async (user: any) => {
    const { entity } = user;
    const { password } = entity;
    const hash = await new PasswordService().hash(password);

    entity.password = hash;
  };
}
