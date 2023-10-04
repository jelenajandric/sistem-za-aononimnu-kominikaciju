export class ActiveUsers {
    id: number;
    username: string;
    publicKey: string;

    constructor(id:number, username: string, publicKey: string) {
        this.id = id;
        this.username = username;
        this.publicKey = publicKey;
    }
}
