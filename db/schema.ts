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
  title: varchar("title", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  pages: integer("pages").notNull(),
  edition: integer("edition").notNull(),
  summary: varchar("summary", { length: 255 }).notNull(),
  borrowed: boolean("borrowed").default(false),
  copies: integer("copies").notNull(),
  categoryId: uuid("category_id")
    .references(() => category.id)
    .notNull(),
  publisherId: uuid("publisher_id")
    .references(() => publisher.id)
    .notNull(),
});

export type Book = typeof book.$inferSelect;

export const bookAuthor = pgTable("book_author", {
  bookId: uuid("book_id")
    .references(() => book.id)
    .notNull(),
  authorId: uuid("author_id")
    .references(() => author.id)
    .notNull(),
});

export type BookAuthor = typeof bookAuthor.$inferSelect;

export const loan = pgTable("loan", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  loanDate: date("loan_date").notNull(),
  dueDate: date("due_date").notNull(),
  returnDate: date("return_date").notNull(),
  bookId: uuid("book_id")
    .references(() => book.id)
    .notNull(),
  personId: uuid("person_id")
    .references(() => person.id)
    .notNull(),
});

export type Loan = typeof loan.$inferSelect;

export const category = pgTable("category", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  description: varchar("description", { length: 255 }).notNull(),
});

export type Category = typeof category.$inferSelect;

export const publisher = pgTable("publisher", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type Publisher = typeof publisher.$inferSelect;

export const author = pgTable("author", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type Author = typeof author.$inferSelect;

export const student = pgTable("student", {
  enrollment: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export type Student = typeof student.$inferSelect;

export const person = pgTable("person", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: integer("type").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
  studentId: uuid("student_id")
    .references(() => student.enrollment)
    .notNull(),
  adminId: uuid("admin_id")
    .references(() => admin.id)
    .notNull(),
});

export type Person = typeof person.$inferSelect;

export const admin = pgTable("admin", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
});

export type Admin = typeof admin.$inferSelect;
