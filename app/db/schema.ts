import { date, pgTable, serial, varchar } from 'drizzle-orm/pg-core';


export const users = pgTable('users', {

  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  createdAt: date('created_at').notNull(),
  updatedAt: date('updated_at').notNull()
  
});
