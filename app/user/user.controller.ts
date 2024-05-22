import { NextRequest, NextResponse } from "next/server";
import { UserService } from "./user.service";

export class UserController {
    constructor(private userService: UserService) {
        
    }

    GET(request: NextRequest) {
        const allUsers = this.userService.findAllUsers();
        return NextResponse.json({users: allUsers})
    }
}