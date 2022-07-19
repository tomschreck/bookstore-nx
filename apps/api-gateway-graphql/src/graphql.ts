
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateBookInput {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category?: Nullable<string>;
    status?: Nullable<string>;
    price?: Nullable<number>;
    inventory?: Nullable<number>;
    notes?: Nullable<string>;
}

export interface UpdateBookInput {
    id: string;
    title?: Nullable<string>;
    author?: Nullable<string>;
    isbn?: Nullable<string>;
    category?: Nullable<string>;
    status?: Nullable<string>;
    price?: Nullable<number>;
    inventory?: Nullable<number>;
    notes?: Nullable<string>;
}

export interface AdjustInventoryInput {
    id: string;
    inventory?: Nullable<number>;
}

export interface Search {
    title?: Nullable<string>;
    author?: Nullable<string>;
    category?: Nullable<string>;
    status?: Nullable<string>;
}

export interface WishlistInput {
    userId: string;
    bookId: string;
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
    notes?: Nullable<string>;
}

export interface IQuery {
    books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    bookDetails(id: string): Nullable<BookForWeb> | Promise<Nullable<BookForWeb>>;
    search(input?: Nullable<Search>): Nullable<Nullable<BookForWeb>[]> | Promise<Nullable<Nullable<BookForWeb>[]>>;
    wishlist(userId: string): Nullable<Wishlist> | Promise<Nullable<Wishlist>>;
}

export interface IMutation {
    createBook(createBookInput: CreateBookInput): Nullable<Void> | Promise<Nullable<Void>>;
    updateBook(updateBookInput: UpdateBookInput): Nullable<Void> | Promise<Nullable<Void>>;
    adjustInventory(adjustInventoryInput: AdjustInventoryInput): Nullable<Void> | Promise<Nullable<Void>>;
    removeBook(id: string): Nullable<Void> | Promise<Nullable<Void>>;
    createWishlist(input: WishlistInput): Nullable<Void> | Promise<Nullable<Void>>;
    removeWishlist(input: WishlistInput): Nullable<Void> | Promise<Nullable<Void>>;
    clearWishlist(userId: string): Nullable<Void> | Promise<Nullable<Void>>;
}

export interface BookForWeb {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category?: Nullable<string>;
    status?: Nullable<string>;
    price?: Nullable<number>;
    inventory?: Nullable<number>;
}

export interface Wishlist {
    userId: string;
    bookList?: Nullable<string[]>;
}

export type Void = any;
type Nullable<T> = T | null;
