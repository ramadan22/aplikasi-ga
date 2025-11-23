export enum Role {
  STAFF = 'STAFF',
  GA = 'GA',
  COORDINATOR = 'COORDINATOR',
  LEAD = 'LEAD',
  MANAGER = 'MANAGER',
}

export const RoleLabel: Record<Role, string> = {
  [Role.STAFF]: 'Staff',
  [Role.GA]: 'General Affairs',
  [Role.COORDINATOR]: 'Coordinator',
  [Role.LEAD]: 'Team Lead',
  [Role.MANAGER]: 'Manager',
};

export const roleAccess: Record<Role, string[]> = {
  [Role.STAFF]: ['/', '/profile'],
  [Role.GA]: ['/', '/assets', '/categories', '/approval', '/profile'],
  [Role.COORDINATOR]: ['/', '/profile'],
  [Role.LEAD]: ['/', '/profile'],
  [Role.MANAGER]: ['/', '/profile'],
};
