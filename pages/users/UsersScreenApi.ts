/* eslint-disable prettier/prettier */
import { db } from "../../shared/database/hooks/useDb";
import { users } from "../../shared/database/schema";

class UsersScreenApi {
  public getUsers() {
    return db.select().from(users);
  }
}

export default new UsersScreenApi();
