import Model from './model';
import bcrypt from 'bcryptjs';

export const resolver = {
  Query: {
    users: async () => {
      try {
        const usersFetched = await Model.find();
        return usersFetched.map((user) => {
          return {
            ...user._doc,
            _id: user.id,
            createdAt: new Date(user._doc.createdAt).toISOString(),
          };
        });
      } catch (error) {
        throw error;
      }
    },
    user: async (root, { _id }) => {
      try {
        const userFetched = await Model.findById(_id);
        return {
          ...userFetched._doc,
          _id: userFetched.id,
          createdAt: new Date(userFetched._doc.createdAt).toISOString(),
        };
      } catch (error) {
        throw error;
      }
    },
    loginUser: async (root, { email, password }, ctx) => {
      try {
        const user = await Model.findOne({ email });
        if (!user) {
          throw new Error('Invalid email');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
          throw new Error('Invalid password');
        }
        const token = await user.generateAuthToken();
        return {
          ...user._doc,
          _id: user.id,
          createdAt: new Date(user._doc.createdAt).toISOString(),
          token,
        };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (root, args, ctx) => {
      try {
        const name = args.user.name;
        const password = args.user.password;
        const email = args.user.email;
        const role = args.user.role;
        const user = new Model({
          name,
          password,
          email,
          role,
        });
        const newUser = await user.save();
        const token = await newUser.generateAuthToken();
        return { ...newUser._doc, _id: newUser.id, token };
      } catch (error) {
        throw error;
      }
    },
    updateUser: async (root, args) => {
      try {
        const user = await Model.updateOne({ _id: args.user._id }, args.user);
        return { ...user._doc, _id: user.id };
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (root, { _id }) => {
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
