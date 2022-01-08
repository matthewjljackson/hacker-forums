import { objectType, mutationField, inputObjectType, nonNull } from 'nexus';
import { User } from '../schema';
import { APP_SECRET } from '../../utils/auth';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token'), t.nonNull.field('user', { type: User });
  },
});

const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
    t.nonNull.string('name');
  },
});

export const signUp = mutationField('signUp', {
  type: AuthPayload,
  args: { data: nonNull(SignUpInput.asArg()) },
  async resolve(_parent, { data }, ctx) {
    const { email, name } = data;
    const password = await bcrypt.hash(data.password, 10);
    const user = await ctx.prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
});

const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});

export const login = mutationField('login', {
  type: AuthPayload,
  args: { data: nonNull(LoginInput) },
  async resolve(_parent, { data }, ctx) {
    const user = await ctx.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new Error('No such user found.');
    }
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      token,
      user,
    };
  },
});
