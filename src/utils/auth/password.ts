import bcrypt from 'bcrypt';

export class PasswordService {
  hash(password: string): string {
    const salt = bcrypt.genSaltSync(10);

    const hash = bcrypt.hashSync(password, salt);

    return hash;
  }

  async verify(hashedPassword: string, password: string) {
    try {
      return bcrypt.compareSync(password, hashedPassword);
    } catch (err) {
      throw new Error('Invalid credentials');
    }
  }
}
