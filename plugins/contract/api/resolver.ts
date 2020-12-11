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
    createdAt: async (contract) => {
      const day = `0${contract.createdAt.getDate()}`.slice(-2);
      const month = `0${contract.createdAt.getMonth() + 1}`.slice(-2);
      const year = contract.createdAt.getFullYear();
      return `${year}-${month}-${day}`;
    },
    rate: async (contract) => {
      return (await contract.populate('rate').execPopulate()).rate;
    },
  },
};

export default resolver;
