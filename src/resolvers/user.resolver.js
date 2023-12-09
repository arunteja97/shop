import { ApolloError } from "apollo-server";
import { User } from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const UserResolvers = {
  Mutation: {
    async registerUser(_, { input }) {
      const { name, email, password } = input;
      const user = await User.findOne({ email });
      if (user) {
        throw new ApolloError(
          `User with email: ${email} already exists`,
          "USER_ALREADY_EXISTS"
        );
      }
      const ePassword = await bcryptjs.hash(password, 10);

      const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: ePassword,
        orders: [],
      });

      const token = jwt.sign({ user_id: newUser._id, email, name }, "ABCDEF", {
        expiresIn: "2h",
      });

      newUser.token = token;
      const res = await newUser.save();
      return {
        _id: res.id,
        ...res._doc,
      };
    },
    async loginUser(_, { input }) {
      const { email, password } = input;
      const user = await User.findOne({ email });

      if (user && (await bcryptjs.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email, name: user.name },
          "ABCDEF",
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        await user.save();
        return {
          _id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Invalid credentials", "INCORRECT_PASSWORD");
      }
    },
  },
  Query: {
    user: (_, { ID }) => User.findById(ID),
  },
};
