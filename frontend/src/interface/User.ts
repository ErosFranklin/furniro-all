export default interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
