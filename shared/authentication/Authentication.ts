/* eslint-disable prettier/prettier */
export class AuthenticationUser {
    public username: string = '';
    public passwsord: string = '';
    public id: number = 0

    constructor(username: string, password: string, id: number) {
        this.username = username
        this.passwsord = password
        this.id = id
    }
}