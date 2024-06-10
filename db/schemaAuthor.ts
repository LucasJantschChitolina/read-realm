import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// Definição da tabela author com colunas id e name
export const author = pgTable("author", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 256 })
});

// Tipo inferido para o author, baseado na tabela
export type Author = typeof author.$inferSelect;
