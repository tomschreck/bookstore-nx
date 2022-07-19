

# BookstoreNx

This is a sample Nrwl NX/Nest JS suite of applications demonstrating the following technical aspects:

- Nrwl NX Monorepo
- NestJs
- Domain Driven Design
- CQRS
- Microservices
- GraphQL
- REST
- Using TCP protocol for communicating between Microservices
- demonstrating eventual consistency with writing books to a read-only table (model projections) used for web portal

## To Get Started

```
npm install
```


The Dockerfile is used to spin up a Postgres instance.  Run the following command to start Postgres instance:

```
docker-compose up
```

To start all of the projects with GraphQL:
```
npm run start:api-graphql
```
The above command will tell Nrwl NX to serve all projects

## GraphQL Playground
The GraphQL playgorund is accessible here:
```
http://localhost:3333/graphql
```

## Projects
This repo contains the following applications:
### APIs:
- apps/api-gateway-graphql
- apps/api-gateway-rest
### Microservices
- apps/service-admin-portal - used for creating/managing books
- apps/service-web-portal - used for surfacing books for web portal
- apps/service-wishlist - used for creating wishlists for a user

### Domain Libraries (domain driven design)
- libs/domains/book-domain - business logic for books
- libs/domains/wishlist-domain - business logic for wishlists


## Sample GraphQL Queries

The repo is following CQRS pattern.


GraphQL
- queries are mapped to query application within targeted microservice
- mutations are mapped to command application within targeted microservice

### Admin Portal
```
// creating books:
mutation
{
  create1: createBook(createBookInput:
  {
    id: "895a8157-a0c9-4f95-b34b-091f5ddeb173"
    title:"Fundamentals of Wavelets"
    author:"Goswami, Jaideva"
    isbn:"ISBN 978-0-596-52068-7"
    category:"nonfiction"
    status:"open"
    price: 23.34
    inventory: 9
    notes: "some notes"
  })
  create2: createBook(createBookInput:
  {
    id: "3cdd170d-2e1a-44e1-92d1-f41f380edc74"
    title:"Age of Wrath, The"
    author:"Eraly, Abraham"
    isbn:"ISBN 978-0-596-52068-7"
    category:"nonfiction",
    status:"open"
    price: 23.34
    inventory: 9
    notes: "Backordered until the end of the year"
  })
  create3: createBook(createBookInput:
  {
    id: "06b3f405-6c94-4e31-a9e1-548da057632c"
    title:"Slaughterhouse Five"
    author:"Vonnegut, Kurt"
    isbn:"ISBN 978-0-596-52068-7"
    category:"fiction",
    status:"open"
    price: 23.34
    inventory: 9
    notes: null
  })
  create4: createBook(createBookInput:
  {
    id: "db266f6c-686c-4eb8-88ed-3c428658db20"
    title:"Moon is Down, The"
    author:"Steinbeck, John"
    isbn:"ISBN 978-0-596-52068-7"
    category:"fiction"
    status:"open"
    price: 23.34
    inventory: 9
    notes: null
  })
  create5: createBook(createBookInput:
  {
    id: "f07634c8-0235-4474-8fae-ad7603f9763b"
    title:"Dylan on Dylan"
    author:"Dylan, Bob"
    isbn:"ISBN 978-0-596-52068-7"
    category:"nonfiction"
    status:"open"
    price: 23.34
    inventory: 9
    notes: null
  })
}

// getting books:
  book(id:"895a8157-a0c9-4f95-b34b-091f5ddeb173")
  {
    id
    title
    author
    isbn
    category
    status
    price
    inventory
    notes
  }

// updating a book:
mutation
{
  updateBook(updateBookInput:
  {
    id: "895a8157-a0c9-4f95-b34b-091f5ddeb173"
    notes: "some different notes"
  })
}

// adjusting book inventory
mutation
{
  adjustInventory(adjustInventoryInput:
    {
      id: "895a8157-a0c9-4f95-b34b-091f5ddeb173"
      inventory: 12
    })
}
```

### Web Portal

```
// getting books
{
  bookDetails(id:"895a8157-a0c9-4f95-b34b-091f5ddeb173")
  {
    id
    title
    author
    isbn
    category
    status
    price
    inventory
  }
  search(input:{category:"fiction"})
  {
    id
    title
    author
    isbn
    category
    status
    price
    inventory
  }
}
```

### Wish List

```
// creating wishlist for a user
mutation
{
  create1: createWishlist(input:
    {
      userId: "d6e3819a-c740-4a82-a9ff-228fc1d0de8e"
      bookId: "f07634c8-0235-4474-8fae-ad7603f9763b"
    })
  create2: createWishlist(input:
    {
      userId: "d6e3819a-c740-4a82-a9ff-228fc1d0de8e"
      bookId: "06b3f405-6c94-4e31-a9e1-548da057632c"
    })
  create3: createWishlist(input:
    {
      userId: "d6e3819a-c740-4a82-a9ff-228fc1d0de8e"
      bookId: "db266f6c-686c-4eb8-88ed-3c428658db20"
    })
}

// get wishlist for a user
{
  wishlist(userId:"d6e3819a-c740-4a82-a9ff-228fc1d0de8e")
  {
    userId
    bookList
  }
}

// remove book from wishlist for a user
mutation
{
  removeWishlist(input:
    {
      userId: "d6e3819a-c740-4a82-a9ff-228fc1d0de8e"
      bookId: "db266f6c-686c-4eb8-88ed-3c428658db20"
    })
}

// clear wishlist for a user
mutation
{
  clearWishlist(userId: "d6e3819a-c740-4a82-a9ff-228fc1d0de8e")
}
```
