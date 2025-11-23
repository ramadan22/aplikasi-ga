import { RequestStatus, SubmissionType } from '@/constants/Approval';
import { Role } from '@/constants/Role';

/**
 * types approval user
 */
interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

/**
 * types approval Asset
 */
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
  name: string;
  serialNumber: string;
  image: string;
  isMaintenance: boolean;
  category: ICategoryRef;
  asset: IAssetOriginalRef;
  updatedAt: string;
}

/**
 * types approval signature
 */
export interface IApprovalSignature {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  positionX: string | null;
  positionY: string | null;
  signedAt: string | null;
  updatedAt: string | null;
  user: IUser | null;
}

/**
 * Default types approval data
 */
export interface IApproval {
  id: string;
  submissionType: SubmissionType;
  status: RequestStatus;
  notes: string;
  createdBy: IUser;
  requestedFor: IUser;
  assets: IApprovalAsset[];
  signatures: IApprovalSignature[];
  createdAt: string;
  updatedAt: string | null;
}

/**
 * types of approvers
 */
export interface IApprovers {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}
