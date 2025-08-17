/* eslint-disable @typescript-eslint/no-explicit-any */

export type PayloadsTypes = {
  username: string;
  password: string;
};

export type AuthTypes = {
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export type LoginResponseTypes = AuthTypes;

export type School = {
  guid: string;
  name: string;
};

export type ProfileTypes = {
  name: string | null;
  email: string | null;
  guid: string;
  phoneNumber: string;
  roles: string[];
  self_identification_id: string;
  address: string;
  gender_key: string;
  gender_label: string;
  national_reference_id: string;
  province_id: string;
  province_label: string;
  city_id: string;
  city_label: string;
  district_id: string;
  district_label: string;
  village_id: string;
  village_label: string;
  school: School;
};

export type GetUsersParamsTypes = {
  name?: string;
  sorter?: string;
  pageSize?: string;
  currentPage?: string;
  roles?: string;
};

export type UsersTypes = {
  guid: string;
  name: string;
  role: string;
};

export type GetUsersResponseTypes = {
  list: UsersTypes[];
};

export type PayloadsRegisterTypes = {
  username: string;
  password: string;
  name: string;
  role: string;
  phoneNumber: string;
  selfId: string;
  address: string;
  gender: string;
  nationalReferenceId: string;
  provinceId: string;
  cityId: string;
  districtId: string;
  villageId: string;
  schoolGuid: string;
};

// types/auth.ts

export type UserData = {
  id: string;
  accessToken: string;
  refreshToken: string;
  name?: string;
  email?: string;
  image?: string;
  [key: string]: any;
};

export type TokenData = {
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  [key: string]: any;
};
