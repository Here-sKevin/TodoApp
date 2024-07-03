/* eslint-disable prettier/prettier */
export type UserType = {
    username: string;
    password: string;
    id: number
}

export class UserModel {
  public username: string = '';
  public password: string = '';
  public id: number = 0;

  public toModel() {
    return {
      username: this.username,
      password: this.password,
      id: this.id
    };
  }
}
