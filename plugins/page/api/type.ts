export const typeDef = `
    type Page {
        _id: ID!
        title: String,
        content: String
    }

    input CreatePageInput {
        title: String!,
        content: String!
    }

    input UpdatePageInput {
        _id: ID!
        title: String,
        content: String
    }

    extend type Query {
        pages: [Page]
        page(_id: String): Page
    } 

    extend type Mutation {
        createPage(page: CreatePageInput): Page
        updatePage(page: UpdatePageInput): Page
        deletePage(_id: ID!): String
    }
`;

export default typeDef;
