export const typeDef = `
    type User {
        _id: ID!
        name: String
        email: String!,
        password: String!,
        role: Int,
        token: String,
    }

    input CreateUserInput {
        name: String,
        email: String!,
        password: String!, 
        role: Int,
    }

    input UpdateUserInput {
        _id: ID!
        name: String
        email: String,
        password: String,
        role: Int,
    }

    extend type Query {
        users: [User]
        user(_id: String): User
        loginUser(email: String, password: String): User
    }

    extend type Mutation {
        createUser(user: CreateUserInput): User
        updateUser(user: UpdateUserInput): User
        deleteUser(_id: ID!): String
    }
`;

export default typeDef;
