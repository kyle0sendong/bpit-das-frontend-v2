export type UserType = {
  id: number;
  username: string;
  email: string;
  firstName: string,
  lastName: string;
  role: string;
}

export type UserContextType = {
  user: UserType | null;
  login: (userData: UserType, token: string) => void;
  update: (userData: UserType) => void;
  logout: () => void;
}