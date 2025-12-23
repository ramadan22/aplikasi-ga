import { MutationConfig } from '@/types/Mutation';
import { IProfile } from '.';

interface IPostLogin {
  email: string;
  password: string;
}

export type PostResponseLogin = ResponseApiTypes<{
  accessToken: string;
  refreshToken?: string;
}>;

export interface IPostChangePassword {
  oldPassword?: string;
  newPassword: string;
  confirmPassword: string;
}

export type PostMutationChangePassword = MutationConfig<IProfile, IPostChangePassword>;

export type PostResponseResetPassword = IProfile & {
  plainPassword: string;
};

export type PostMutationResetPassword = MutationConfig<PostResponseResetPassword, { id }>;
