import { pgTable, varchar, numeric, serial, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 18, scale: 4 }).notNull(),
});

export const cliente = pgTable("cliente", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    cpf: text("cpf").notNull(),
    telefone: text("telefone").notNull()
});

export const usuario = pgTable("usuario", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    cpf: text("cpf").notNull(),
    telefone: text("telefone").notNull()
});

export const fornecedor = pgTable("fornecedor", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    cpf_cnpj: text("cpf_cnpj").notNull(),
    telefone: text("telefone").notNull()
});