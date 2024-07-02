/* eslint-disable prettier/prettier */
import { db } from '../../shared/database/hooks/useDb';
import { users } from '../../shared/database/schema';
import { RegisterModel } from './interface/RegisterModel';

class SignUpScreenApi {
  public signUp(user: RegisterModel) {
    return db
      .insert(users)
      .values({
        username: user.username,
        password: user.password,
      })
      .returning();
  }
}

export default new SignUpScreenApi();
