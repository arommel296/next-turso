import * as bcrypt from 'bcrypt';

export interface user {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export class User{
    private id?: number;
    private username: string;
    private email: string;
    private password: string;
    private role_id: number;


    constructor(username: string, email: string, password: string, role: number, id?: number){
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role_id = role;
    }

    public getId(){
        return this.id;
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string) {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        let pwd = bcrypt.hash(password, 10)+"";
        this.password = pwd;
    }

    public getRole(): number{
        return this.role_id;
    }

    public setRole(role_id: number){
        this.role_id = role_id;
    }

    public jsonSerialize(){
        return {
            'id' : this.getId(),
            'username' : this.getUsername(),
            'email' : this.getEmail(),
            'role_id' : this.getRole()
        }
    }

}