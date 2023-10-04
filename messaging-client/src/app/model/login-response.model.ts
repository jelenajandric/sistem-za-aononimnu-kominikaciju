export class LoginResponse {
    id: number;
    username: string;
    isLoggedIn: boolean;
    privateKey: string;

    constructor(id:number, username: string, isLoggedIn: boolean, privateKey: string) {
        this.id = id;
        this.username = username;
        this.isLoggedIn = isLoggedIn;
        this.privateKey = privateKey;
    }
}
