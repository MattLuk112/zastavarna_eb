export const typeDef = `
    type Rate {
        _id: ID!
        name: String
        percentageFromPrice: Int
        amount: Float
        days: Int
        maxPrice: Int
        maxDays: Int
        fineForLost: Int
    }

    input CreateRateInput {
        name: String!
        percentageFromPrice: Int!
        amount: Float!
        days: Int!
        maxPrice: Int!
        maxDays: Int!
        fineForLost: Int
    }

    input UpdateRateInput {
        _id: ID!
        name: String
        percentageFromPrice: Int
        amount: Float
        days: Int
        maxPrice: Int
        maxDays: Int
        fineForLost: Int
    }

    extend type Query {
        rates: [Rate]
        rate(_id: String): Rate
    } 

    extend type Mutation {
        createRate(rate: CreateRateInput): Rate
        updateRate(rate: UpdateRateInput): Rate
        deleteRate(_id: ID!): String
    }
`;

export default typeDef;
