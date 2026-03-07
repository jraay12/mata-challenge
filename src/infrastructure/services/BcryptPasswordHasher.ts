import bcrypt from "bcrypt";
import { PasswordHasher } from "../../domain/services/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly saltRound = 10) {}
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRound);
  }

  async compare(password: string, hash: string): Promise<Boolean> {
    return bcrypt.compare(password, hash);
  }
}
