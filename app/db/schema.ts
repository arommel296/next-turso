import { sql } from 'drizzle-orm';
import { ForeignKey, integer, sqliteTable, text,  } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer('id').primaryKey(),
  username: text('username').notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role_id: integer('role_id').notNull().references(()=>roleTable.id),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
});

export const roleTable = sqliteTable('role', {
  id: integer('id').primaryKey(),
  role: text('role').unique().default('USER')
})

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertRole = typeof roleTable.$inferInsert;
export type SelectRole = typeof roleTable.$inferSelect;