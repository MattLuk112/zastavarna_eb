export const typeDef = `
    type Client {
        _id: ID
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        idCard: String,
        birthNumber: String,
        nationality: String,
        sex: String,
    }

    input CreateClientInput {
        firstName: String!,
        lastName: String!,
        street: String!,
        city: String!,
        idCard: String!,
        birthNumber: String!,
        nationality: String!,
        sex: String,
    }

    input UpdateClientInput {
        _id: ID!
        firstName: String,
        lastName: String,
        street: String,
        city: String,
        idCard: String,
        birthNumber: String,
        nationality: String,
        sex: String,
    }

    extend type Query {
        clients: [Client]
        client(_id: String): Client
    }

    extend type Mutation {
        createClient(client: CreateClientInput): Client
        updateClient(client: UpdateClientInput): Client
        deleteClient(_id: ID!): String
    }
`;

export default typeDef;
