import Model from './model';

export const resolver = {
  Query: {
    contracts: async () => {
      try {
        const contractsFetched = await Model.find();
        return contractsFetched;
      } catch (error) {
        throw error;
      }
    },
    contract: async (root, { _id }) => {
      try {
        const contractFetched = await Model.findById(_id);
        return contractFetched;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createContract: async (root, { contract: data }, ctx) => {
      try {
        const document = new Model(data);
        const newDocument = await document.save();
        return newDocument;
      } catch (error) {
        throw error;
      }
    },
    updateContract: async (root, { contract: data }) => {
      try {
        const document = await Model.updateOne({ _id: data._id }, data);
        return { ...document._doc, _id: document.id };
      } catch (error) {
        throw error;
      }
    },
    deleteContract: async (root, { _id }) => {
      try {
        await Model.deleteOne({ _id });
        return 'true';
      } catch (error) {
        throw error;
      }
    },
  },
  Contract: {
    client: async (contract) => {
      return (await contract.populate('client').execPopulate()).client;
    },
    rate: async (contract) => {
      return (await contract.populate('rate').execPopulate()).rate;
    },
  },
};

export default resolver;
