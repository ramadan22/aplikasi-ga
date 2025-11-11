import { RequestStatus, SubmissionType } from '@/constants/Approval';
import { Role } from '@/constants/Role';
import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type ID = string;

interface CreatedBy {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface Category {
  id: string;
  name: string;
  prefix: string;
  isDevice: boolean;
}

export interface Asset {
  id: string;
  name: string;
  image: string | null;
  isMaintenance: boolean;
  serialNumber: string | null;
  categoryId: string;
  category: Category;
  asset: null;
  updatedAt: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface Signature {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  signedAt: string | null;
  user: User;
  updatedAt: string | null;
}

export interface Data {
  id: string;
  submissionType: SubmissionType | null;
  status: RequestStatus | null;
  notes: string;
  createdBy: CreatedBy;
  requestedFor: string;
  assets: Asset[];
  signatures: Signature[];
  createdAt: string;
  updatedAt: string | null;
}

export type GetParams = {} & PaginationParams;
export type GetResponse = ResponseApiTypes<Data[]>;
export type PostParams = Field;
export type PostResponse = ResponseApiTypes<Data>;

export type PostInput = PostParams;
export type PostOutput = PostResponse;
export type PostError = AxiosError;

export type PostMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type UpdateMutationOptions = UseMutationOptions<PostOutput, PostError, PostInput>;
export type DeleteMutationOptions = UseMutationOptions<PostOutput, PostError, ID>;

export interface DataApprovers {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export type GetApproversResponse = ResponseApiTypes<{ label: string; value: string }[]>;

/**
 * Type for Detail Approval
 */

export interface IUserRef {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  image: string | null;
  role: Role;
}

export interface ICategoryRef {
  id: string;
  name: string;
  prefix: string;
}

export interface IAssetOriginalRef {
  id: string;
  name: string;
  code: string;
  image: string | null;
  serialNumber: string | null;
  isMaintenance: boolean;
}

export interface IApprovalAsset {
  id: string;
  name: string | null;
  serialNumber: string | null;
  image: string | null;
  isMaintenance: boolean | null;

  category: ICategoryRef | null;
  asset: IAssetOriginalRef | null;

  updatedAt: string | null;
}

export interface IApprovalSignature {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  positionX: string | null;
  positionY: string | null;
  signedAt: string | null;
  updatedAt: string | null;
  user: IUserRef | null;
}

export interface IApprovalDetail {
  id: string;
  submissionType: SubmissionType;
  status: RequestStatus;
  notes: string | null;

  createdBy: IUserRef;
  requestedFor: IUserRef | null;

  assets: IApprovalAsset[];
  signatures: IApprovalSignature[];

  createdAt: string;
  updatedAt: string | null;
}

export type GetResponseDetail = ResponseApiTypes<IApprovalDetail>;

/**
 * Type for Reviewed Signature
 */

export type GetResponseReviewedSig = ResponseApiTypes<{ isReviewed: boolean }>;

/**
 * update position signature
 */

export type UpdateParamSignature = {
  id?: string;
  signatures: {
    id: string;
    positionX: number;
    positionY: number;
  }[];
};

export type UpdateResponseSignature = ResponseApiTypes<
  {
    id: string;
    positionX: number;
    positionY: number;
  }[]
>;

export type UpdateInputSignature = UpdateParamSignature;
export type UpdateOutputSignature = UpdateResponseSignature;

export type UpdateSignaturePositionOptions = UseMutationOptions<
  UpdateOutputSignature,
  PostError,
  UpdateInputSignature
>;

/**
 * update status signature
 */

export type UpdateStatusMutationOptions = UseMutationOptions<unknown, PostError, { id: string }>;
