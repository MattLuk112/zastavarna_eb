import Model from './model';

export const resolver = {
  Query: {
    rates: async () => {
      try {
        const documentsFetched = await Model.find();
        return documentsFetched;
      } catch (error) {
        throw error;
      }
    },
    rate: async (root, { _id }) => {
      try {
        const documentFetched = await Model.findById(_id);
        return documentFetched;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createRate: async (root, { rate: data }, ctx) => {
      try {
        const document = new Model(data);
        const newDocument = await document.save();
        return newDocument;
      } catch (error) {
        throw error;
      }
    },
    updateRate: async (root, { rate: data }) => {
      try {
        const document = await Model.findByIdAndUpdate(
          { _id: data._id },
          data,
          { new: true },
        );
        return document;
      } catch (error) {
        throw error;
      }
    },
    deleteRate: async (root, { _id }) => {
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
