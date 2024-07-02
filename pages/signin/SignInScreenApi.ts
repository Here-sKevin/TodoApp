/* eslint-disable prettier/prettier */
import { and, eq, sql } from 'drizzle-orm';
import { users } from '../../shared/database/schema';
import { LoginModel } from './interface/LoginModel';
import { db } from '../../shared/database/hooks/useDb';

class SignInScreenApi {
  public signIn(user: LoginModel) {
    console.log('signIn: ', user)
    return db
    .select()
    .from(users)
    .where(and(eq(users.username, sql<string>`${user.username}`), eq(users.password, sql<string>`${user.password}`)));
  }
}

export default new SignInScreenApi();

