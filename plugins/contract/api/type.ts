export const typeDef = `
    type Contract {
        _id: ID!
        itemName: String
        itemPrice: Int
        loanAmount: Int
        payDate: String
        totalInterest: Int
        dayInterest: Float
        totalPrice: Int
        client: Client
        rate: Rate
        createdAt: String
    }

    input CreateContractInput {
        client: String!
        itemName: String
        itemPrice: Int
        loanAmount: Int!
        payDate: String!
        totalInterest: Int
        dayInterest: Float
        totalPrice: Int
        rate: String!
    }

    input UpdateContractInput {
        _id: ID!
        client: String
        itemName: String
        itemPrice: Int
        loanAmount: Int
        payDate: String
        rate: String
    }

    extend type Query {
        contracts: [Contract]
        contract(_id: String): Contract
    } 

    extend type Mutation {
        createContract(contract: CreateContractInput): Contract
        updateContract(contract: UpdateContractInput): Contract
        deleteContract(_id: ID!): String
    }
`;

export default typeDef;
