import { Migration } from '@mikro-orm/migrations';

export class Migration20220309112816 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default null, "deleted_at" timestamptz(0) null default null, "deleted" boolean not null default false, "name" varchar(255) not null, "email" varchar(255) not null);');

    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default null, "deleted_at" timestamptz(0) null default null, "deleted" boolean not null default false, "name" varchar(255) not null);');
  }

}
