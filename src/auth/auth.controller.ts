import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    // @UseGuards(AuthGuard('local'))
    @UseGuards(LocalAuthGuard)
    @Post('login')
    loginUser(@Body('username') username: string, @Body('password') password: string){
        return this.authService.login(username, password)
        // return this.authService.validateUser(username, password)
    }
    
    @UseGuards(LocalAuthGuard)
    @Post('login/req')
    loginUserReq(@Request() req){
        console.log("req")
        console.log(req.user)
        return req.user
    }
}  