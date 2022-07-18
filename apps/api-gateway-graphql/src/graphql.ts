
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface BookInput {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category?: Nullable<string>;
    status?: Nullable<string>;
    price?: Nullable<number>;
    inventory?: Nullable<number>;
}

export interface AdjustInventoryInput {
    id: string;
    inventory?: Nullable<number>;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category?: Nullable<string>;
    status?: Nullable<string>;
    price?: Nullable<number>;
    inventory?: Nullable<number>;
}

export interface IQuery {
    books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
}

export interface IMutation {
    createBook(createBookInput: BookInput): Nullable<Void> | Promise<Nullable<Void>>;
    updateBook(updateBookInput: BookInput): Nullable<Void> | Promise<Nullable<Void>>;
    adjustInventory(adjustInventoryInput: AdjustInventoryInput): Nullable<Void> | Promise<Nullable<Void>>;
    removeBook(id: string): Nullable<Void> | Promise<Nullable<Void>>;
}

export type Void = any;
type Nullable<T> = T | null;
