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
  copies: integer("copies").notNull(),
  cover: varchar("cover", { length: 255 }).notNull(), //todo: add on modelling
  categoryId: uuid("category_id")
    .references(() => category.id)
    .notNull(),
  publisherId: uuid("publisher_id")
    .references(() => publisher.id)
    .notNull(),
});

export type Book = typeof book.$inferSelect;
export type BookInsert = typeof book.$inferInsert;

export const bookAuthor = pgTable("book_author", {
  bookId: uuid("book_id")
    .references(() => book.id)
    .notNull(),
  authorId: uuid("author_id")
    .references(() => author.id)
    .notNull(),
});

export type BookAuthor = typeof bookAuthor.$inferSelect;

export const bookCopy = pgTable("book_copy", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  bookId: uuid("book_id").references(() => book.id),
  borrowed: boolean("borrowed").default(false),
});

export type BookCopy = typeof bookCopy.$inferSelect;

export const loan = pgTable("loan", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  loanDate: date("loan_date").notNull(),
  dueDate: date("due_date").notNull(),
  status: varchar("status", { length: 10 }).notNull(), // "on_time", "overdue", "finished" // todo: adicionar na modelagem
  returnDate: date("return_date"),
  bookCopyId: uuid("book_copy_id")
    .references(() => bookCopy.id)
    .notNull(),
  personId: uuid("person_id")
    .references(() => person.id)
    .notNull(),
});

export type Loan = typeof loan.$inferSelect;

export const category = pgTable("category", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
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

export const person = pgTable("person", {
  id: uuid("uuid1").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  phone: varchar("phone", { length: 255 }).notNull(),
  status: varchar("status", { length: 10 }).notNull(),
  studentEnrollment: varchar("student_enrollment", { length: 255 })
    .unique()
    .notNull(),
});

export type Person = typeof person.$inferSelect;
