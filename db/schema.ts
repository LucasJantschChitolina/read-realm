import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const book = pgTable("book", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }),
  year: integer("year"),
  pages: integer("pages"),
  edition: integer("edition"),
  summary: varchar("summary", { length: 255 }),
  borrowed: boolean("borrowed"),
  copies: integer("copies"),
  categoryId: uuid("category_id").references(() => category.id),
  publisherId: uuid("publisher_id").references(() => publisher.id),
});

export type Book = typeof book.$inferSelect;

export const bookAuthor = pgTable("book_author", {
  bookId: uuid("book_id").references(() => book.id),
  authorId: uuid("author_id").references(() => author.id),
});

export type BookAuthor = typeof bookAuthor.$inferSelect;

export const loan = pgTable("loan", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  loanDate: date("loan_date"),
  dueDate: date("due_date"),
  returnDate: date("return_date"),
  bookId: uuid("book_id").references(() => book.id),
  personId: uuid("person_id").references(() => person.id),
});

export type Loan = typeof loan.$inferSelect;

export const category = pgTable("category", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  description: varchar("description", { length: 255 }),
});

export type Category = typeof category.$inferSelect;

export const publisher = pgTable("publisher", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
});

export type Publisher = typeof publisher.$inferSelect;

export const author = pgTable("author", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
});

export type Author = typeof author.$inferSelect;

export const student = pgTable("student", {
  enrollment: uuid("uuid1").defaultRandom().primaryKey(),
});

export type Student = typeof student.$inferSelect;

export const person = pgTable("person", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }),
  type: integer("type"),
  email: varchar("email", { length: 255 }),
  password: varchar("password", { length: 255 }),
  phone: varchar("phone", { length: 255 }),
  studentId: uuid("student_id").references(() => student.enrollment),
  adminId: uuid("admin_id").references(() => admin.id),
});

export type Person = typeof person.$inferSelect;

export const admin = pgTable("admin", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
});

export type Admin = typeof admin.$inferSelect;
