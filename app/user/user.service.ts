// import { User } from "next-auth";
import { db } from "../db/db";
import * as bcrypt from 'bcrypt';
import { User, user } from "./user.type";
import { userTable } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import Error from "next/error";
import { notFound } from "next/navigation";

export class UserService {
    constructor() {

    }

    async createUser(userToCreate: User) {
        const hashedPassword = await bcrypt.hash(userToCreate.getPassword(), 10)
        const username = userToCreate.getUsername();
        const email = userToCreate.getEmail();
        const role_id = userToCreate.getRole();
        const listOfUsers = await db.select().from(userTable);
        const u = listOfUsers.find((user) => user.email === email);

        if (u) {
            // throw excepti('User already exists');
            return Response.json({ error: "User already exists" })
        }
        console.log("antes del return");
        await db.insert(userTable).values({ username: username, email: email, password: hashedPassword, role_id: role_id });
        // const rowsAffected = await db.insert(userTable).values({ username: username, email: email, password: hashedPassword, role_id: role_id });
        // console.log(rowsAffected);
        const newUser = new User(username, email, hashedPassword, role_id);
        return newUser;
    }

    async findAllUsers() {
        console.log(await db.select().from(userTable));
        return await db.select().from(userTable);
    }

    async updateUser(userUpdated: User, id: number) {
        const allUser = await db.select().from(userTable);
        // if (userUpdated.getId()==undefined) {
        //     // const id = userUpdated.getId();
        //     const userToUpdate = allUser.find((user) => user.id === +id);
        // }
        const userToUpdate = allUser.find((user) => user.id === +id);

        if (!userToUpdate) {
            return `User with ${id} does not exit`;
        }
        const hashedPassword = await bcrypt.hash(userUpdated.getPassword(), 10)
        return await db.update(userTable).set({ username: userUpdated.getUsername(), email: userUpdated.getEmail(), password: hashedPassword, role_id: userUpdated.getId() })
    }

    async removeUser(id: number) {
        const allUser = await db.select().from(userTable);
        const getUser = allUser.find((user) => user.id === +id);

        if (!getUser) {
            return `User with ${id} does not exit`;
        }
        const user = await db.delete(userTable).where(eq(userTable.id, +id));
        return user;
    }

    async findUserByEmail(email: string){
        // const allUser = await db.select().from(userTable);
        const listOfUsers = await db.select().from(userTable);
        const getUser = listOfUsers.find((user) => user.email === email);
        // if (getUser) {
        //     const user = new User(getUser.username, getUser.email, getUser.password, getUser.id)
        // }
        // const getUser = allUser.find((user) => user.email === +email);

        if (!getUser) {
            return `User with ${email} does not exits.`;
        }

        const user = new User(getUser.username, getUser.email, getUser.password, getUser.id)
        return user.jsonSerialize();
    }
}