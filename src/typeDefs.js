import { gql } from "apollo-server";

export const typeDefs = gql`
  scalar DateTime

  type Product {
    _id: ID!
    name: String!
    price: Float!
    createdAt: DateTime!
  }

  type OrderItem {
    _id: ID!
    product: Product!
    quantity: Float!
  }

  type Order {
    _id: ID!
    userId: String!
    items: [OrderItem!]!
    createdAt: DateTime!
  }

  type Query {
    getProducts: [Product!]!
    getOrders: [Order!]!
    user(id: ID!): User!
  }

  input CreateProductInput {
    name: String!
    price: Float!
  }

  input OrderItemInput {
    productId: String!
    quantity: Float!
  }

  input CreateOrderInput {
    orderItems: [OrderItemInput!]!
  }
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    token: String!
    orders: [Order!]!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  type Mutation {
    createProduct(input: CreateProductInput!): Product!
    createOrder(input: CreateOrderInput!): Order!
    registerUser(input: RegisterInput!): User
    loginUser(input: LoginInput!): User
  }
`;
