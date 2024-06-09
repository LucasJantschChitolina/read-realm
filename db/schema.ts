import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const books = pgTable("books", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 }),
  author: varchar("author", { length: 256 }),
});

export type Book = typeof books.$inferSelect;
