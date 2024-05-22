import { db } from "@/app/db/db";
import { UserService } from "@/app/user/user.service";
import { User } from "@/app/user/user.type";
import { NextRequest, NextResponse } from "next/server";
// import { UserService } from "./user.service";

// export class UserController {
//     constructor(private userService: UserService) {
        
//     }

//     GET(request: NextRequest) {
//         const allUsers = this.userService.findAllUsers();
//         return NextResponse.json({users: allUsers})
//     }
// }

export async function GET(request: NextRequest) {
    const us = new UserService();
    const allUsers = us.findAllUsers();
    return NextResponse.json({users: allUsers})
}

export async function POST(request: NextRequest) {
    const us = new UserService();
    const newUser: User = await request.json();
    const createdUser = us.createUser(newUser);

    return NextResponse.json({user: createdUser})
    // const us = new UserService();
    // const allUsers = us.findAllUsers();
    // return NextResponse.json({users: allUsers})
}