/* eslint-disable prettier/prettier */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("Users", {
    id: integer("id").primaryKey({autoIncrement: true}),
    username: text("username").notNull().unique(),
    password: text("password").notNull()
})

export const todos = sqliteTable("Todos", {
    id: integer("id").primaryKey({autoIncrement: true}),
    title: text("title").notNull(),
    userId: integer("userId").notNull()
})