/* eslint-disable prettier/prettier */
type UsersType = {
    //id: number;
    username: string;
    password: string;
  }
  export class UsersDBModel {
  //public id: number = 0;
  public username: string = '';
  public password: string = '';
  
  constructor(user: UsersType) {
    //this.id = user.id;
    this.username = user.username;
    this.password = user.password;
  }
  
  }
  