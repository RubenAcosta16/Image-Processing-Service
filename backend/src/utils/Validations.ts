import { UserError } from "./errorFactory";

class Validation {
  static username(username: string): void {
    if (!username) throw new UserError("Username is required");
    if (typeof username !== "string")
      throw new UserError("Username must be a string");
    if (username.length < 3)
      throw new UserError("Username must be at least 3 characters long");
  }

  static password(password: string): void {
    if (!password) throw new UserError("Password is required");
    if (typeof password !== "string")
      throw new UserError("Password must be a string");
    if (password.length < 8)
      throw new UserError("Password must be at least 8 characters long");
  }
}

export default Validation;
