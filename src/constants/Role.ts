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
  [Role.STAFF]: ['/', '/approval', '/profile'],
  [Role.GA]: ['/', '/assets', '/categories', '/approval', '/profile', '/users'],
  [Role.COORDINATOR]: ['/', '/approval', '/profile'],
  [Role.LEAD]: ['/', '/approval', '/profile'],
  [Role.MANAGER]: ['/', '/approval', '/profile'],
};
