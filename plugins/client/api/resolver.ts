import Model from './model';

export const resolver = {
  Query: {
    clients: async () => {
      try {
        const documentsFetched = await Model.find();
        return documentsFetched.map((document) => {
          return {
            ...document._doc,
            _id: document.id,
            createdAt: new Date(document._doc.createdAt).toISOString(),
          };
        });
      } catch (error) {
        throw error;
      }
    },
    client: async (root, { _id }) => {
      try {
        const documentFetched = await Model.findById(_id);
        return {
          ...documentFetched._doc,
          _id: documentFetched.id,
          createdAt: new Date(documentFetched._doc.createdAt).toISOString(),
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createClient: async (root, { client: data }, ctx) => {
      try {
        const document = new Model(data);
        const newDocument = await document.save();
        return { ...newDocument._doc, _id: newDocument.id };
      } catch (error) {
        throw error;
      }
    },
    updateClient: async (root, { client: data }) => {
      try {
        const document = await Model.findByIdAndUpdate(
          { _id: data._id },
          data,
          { new: true },
        );
        return { ...document._doc, _id: document.id };
      } catch (error) {
        throw error;
      }
    },
    deleteClient: async (root, { _id }) => {
      try {
        await Model.deleteOne({ _id });
        return 'true';
      } catch (error) {
        throw error;
      }
    },
  },
};

export default resolver;
