export type UserType = {
  id: number;
  username: string;
  email: string;
  firstName: string,
  lastName: string;
  role: string;
  roleId: number | string;
  first_name: string,
  last_name: string;
  role_id: number | string;
}

export type UserContextType = {
  user: UserType | null;
  login: (userData: UserType, token: string) => void;
  update: (userData: UserType) => void;
  logout: () => void;
}

export type UserRolesType = {
  id: number;
  role: string;
}