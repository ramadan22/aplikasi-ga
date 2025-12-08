import { RequestStatus, SubmissionType } from '@/constants/Approval';
import { MutationConfig } from '@/types/Mutation';
import { PaginationParams, ResponseApiTypes } from '@/types/ResponseApi';
import { IApproval } from '.';

/**
 * Get Approval types
 */
export type GetParamsApproval = PaginationParams & {};
export type GetResponseApproval = ResponseApiTypes<IApproval[]>;

/**
 * Get approvers types
 */
export type GetParamsApprovers = PaginationParams & {};
export type GetResponseApprovers = ResponseApiTypes<IApprovers[]>;

/**
 * Create Approval types
 */
interface IPostParams {
  submissionType: SubmissionType;
  status: RequestStatus;
  notes: string;
  requestedForId: string;
  // signatures: [];
  // assets: [];
}

export type ApprovalPostMutationOptions = MutationConfig<IApproval, IPostParams>;
export type IPostResponse = ResponseApiTypes<IApproval>;

/**
 * Update Approval types
 */
interface IPutParams {
  id?: string;
  submissionType: SubmissionType;
  status: RequestStatus;
  notes: string;
  requestedForId: string;
}

export type ApprovalPutMutationOptions = MutationConfig<IApproval, IPutParams>;
export type IPutResponse = ResponseApiTypes<IApproval>;

/**
 * Get reviewed signature
 */
export type ReviewedSignatureGetRes = ResponseApiTypes<{ isReviewed: boolean }>;

/**
 * Get detail approval
 */
export type GetResponseDetail = ResponseApiTypes<IApproval>;

/**
 * update position signature
 */
export type PutParamSignature = {
  id?: string;
  signatures: {
    id: string;
    positionX: number;
    positionY: number;
  }[];
};

export type PutResponseSignature = ResponseApiTypes<
  {
    id: string;
    positionX: number;
    positionY: number;
  }[]
>;

export type PutMutationOptionsSignature = MutationConfig<ResponseSignature, PutParamSignature>;

interface IPostParamsSignApproval {
  id: string;
  image: string;
  approvalId: string;
}

export type PostMutationOptionsSignApproval = MutationConfig<object, IPostParamsSignApproval>;
export type IPostResponseSignApproval = ResponseApiTypes<object>;

/**
 * Get previous signature
 */
export type GetResponsePreviousSignature = ResponseApiTypes<{ image: string }>;
