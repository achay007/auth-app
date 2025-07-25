import { date, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { foreignKey } from "drizzle-orm/pg-core";


export const users = pgTable('users', {

  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }),
  role: varchar('role', { length: 50 }).notNull(),
  school: varchar("school").references(() => school.id),
  createdAt: varchar('created_at').notNull(),
  updatedAt: varchar('updated_at').notNull()
  
});
export const school = pgTable('school', {

  id: varchar('id').primaryKey(),
  schoolName: varchar('schoolName', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 255 }).unique().notNull(),
  
});
