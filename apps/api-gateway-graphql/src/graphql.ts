
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

export interface Search {
    title: string;
    author: string;
    category?: Nullable<string>;
    status?: Nullable<string>;
}

export interface AdjustInventoryInput {
    id: string;
    inventory?: Nullable<number>;
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

export interface IQuery {
    books(): Nullable<Book>[] | Promise<Nullable<Book>[]>;
    book(id: string): Nullable<Book> | Promise<Nullable<Book>>;
    bookForWeb(id: string): Nullable<BookForWeb> | Promise<Nullable<BookForWeb>>;
    searchBooksForWeb(search?: Nullable<Search>): Nullable<Nullable<Book>[]> | Promise<Nullable<Nullable<Book>[]>>;
    wishlist(userId: string): Nullable<Wishlist> | Promise<Nullable<Wishlist>>;
}

export interface IMutation {
    createBook(createBookInput: CreateBookInput): Nullable<Void> | Promise<Nullable<Void>>;
    updateBook(updateBookInput: UpdateBookInput): Nullable<Void> | Promise<Nullable<Void>>;
    adjustInventory(adjustInventoryInput: AdjustInventoryInput): Nullable<Void> | Promise<Nullable<Void>>;
    removeBook(id: string): Nullable<Void> | Promise<Nullable<Void>>;
    createWishlist(createWishlistInput: WishlistInput): Nullable<Void> | Promise<Nullable<Void>>;
    updateWishlist(updateWishlistInput: WishlistInput): Nullable<Void> | Promise<Nullable<Void>>;
    removeWishlist(removeWishlistInut: WishlistInput): Nullable<Void> | Promise<Nullable<Void>>;
    clearWishlist(userId: string): Nullable<Void> | Promise<Nullable<Void>>;
}

export interface Wishlist {
    userId: string;
    collection?: Nullable<Nullable<WishlistItem>[]>;
}

export interface WishlistItem {
    bookId: string;
}

export type Void = any;
type Nullable<T> = T | null;
