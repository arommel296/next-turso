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
    const allUsers = await us.findAllUsers();
    return Response.json({users: allUsers})
}

export async function POST(request: Request, res: Response) {
    const us = new UserService();
    const data = await request.json();
    const newUser = new User(data.username, data.email, data.password, data.role_id)

    try{
        const createdUser = await us.createUser(newUser);
        if (createdUser) {
            return Response.json({user: newUser});
        }
        return Response.json({ error: 'The user could not be created' }, { status: 500 });
    } catch(error){
        return Response.json({ error: 'User not found by that email.' }, { status: 409 });
    }
    

    // return Response.json({user: createdUser})
    // const us = new UserService();
    // const allUsers = us.findAllUsers();
    // return NextResponse.json({users: allUsers})
}

export async function PUT(request: Request, res: Response) {
    const us = new UserService();
    const data = await request.json();
    const newUser = new User(data.username, data.email, data.password, data.role_id);

    try{
        const updatedUser = us.updateUser(newUser, data.id);
        return Response.json({user: updatedUser});
    } catch(error){
        return Response.json({ error: 'User not found by that email.' }, { status: 409 });
    }

}

export async function DELETE() {
    
}