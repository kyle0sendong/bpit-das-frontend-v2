export type UserType = {
  username: string;
  email: string;
  first_name: string,
  last_name: string;
  role: string;
}

export type UserContextType = {
  user: UserType | null;
  login: (userData: UserType, token: string) => void;
  logout: () => void;
}