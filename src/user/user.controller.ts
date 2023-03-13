import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Forgotpassword,
  Login,
  Resettpassword,
  Signup,
  Verify,
} from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('Signup')
  async Signupuser(@Body() data: Signup) {
    return this.userService.Signup(data);
  }

  @Post('verify')
  async Verifyuser(@Body() data: Verify) {
    return this.userService.VerifyAccount(data);
  }

  @Post('Forgot')
  async ForgotPass(@Body() data: Forgotpassword) {
    return this.userService.ForgotPassword(data);
  }

  @Post('ResetPass')
  async ResetPass(@Body() data: Resettpassword) {
    return this.userService.ResetPassword(data);
  }

  @Post('Login')
  async Login(@Body() data: Login) {
    return this.userService.LoginUser(data);
  }
}
