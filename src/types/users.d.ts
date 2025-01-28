export type UserType = {
  username: string;
  email: string;
  firstName: string,
  lastName: string;
  role: string;
}

export type UserContextType = {
  user: UserType | null;
  login: (userData: UserType, token: string) => void;
  logout: () => void;
}