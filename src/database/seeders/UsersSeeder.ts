import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../models';

const password = '$2a$10$LQw7MNycGxQFICuRiwVPVeKRQLE4Nw8Zvwz5a/NO.clQC07OoCMzS'; // 12345

const USERS = [
  { name: 'Admin', email: 'admin@mail.com', password, role_id: 1 },
  { name: 'User', email: 'user@mail.com', password, role_id: 2 },
  { name: 'Guest', email: 'guest@mail.com', password, role_id: 3 },
] as any;

export class UsersSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const user of USERS) {
      const role = await em.findOne('Role', { id: user.role_id });

      em.create(User, {
        ...user,
        role,
      });
    }
  }
}
