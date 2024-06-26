/* eslint-disable prettier/prettier */
export class AuthenticationUser {
    public username: string = '';
    public passwsord: string = '';

    constructor(username: string, password: string) {
        this.username = username
        this.passwsord = password
    }
}