interface User {
  id: string;
  name: string;
  username?: string;
  phone?: string;
  password?: string;
  passwordConfirm?: string;
  avatar?: string;
  online?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type {User};
