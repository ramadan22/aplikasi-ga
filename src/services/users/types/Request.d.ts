import { IUser } from '.';

/**
 * Get approvers types
 */
export type GetParams = PaginationParams & {};
export type GetResponse = ResponseApiTypes<IUser[]>;
