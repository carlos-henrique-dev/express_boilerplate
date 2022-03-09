import type { EntityManager, RequiredEntityData } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../../models';

const ROLES = [
  { name: 'Admin', slug: 'admin' },
  { name: 'User', slug: 'user' },
  { name: 'Guest', slug: 'guest' },
] as RequiredEntityData<Role>[];

export class RolesSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const role of ROLES) {
      em.create(Role, role);
    }
  }
}
