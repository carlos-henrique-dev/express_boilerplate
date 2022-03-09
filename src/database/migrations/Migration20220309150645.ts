import { Migration } from '@mikro-orm/migrations';

export class Migration20220309150645 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default null, "deleted_at" timestamptz(0) null default null, "deleted" boolean not null default false, "name" varchar(255) not null, "slug" varchar(255) not null);');
    this.addSql('alter table "role" add constraint "role_slug_unique" unique ("slug");');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null default null, "deleted_at" timestamptz(0) null default null, "deleted" boolean not null default false, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role_id" int not null);');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('alter table "user" add constraint "user_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');
  }

}
