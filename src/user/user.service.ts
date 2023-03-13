import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.Entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IForgotpassword, ILogin, IResettpassword, ISignup, Iverify } from './user.dto';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userepo: Repository<User>) {}

  async Signup(data: ISignup) {
    const user = await this.userepo.findOneBy({ userEmail: data.userEmail });

    const otp = Math.floor(100000 + Math.random() * 900000);

    if (user) {
      throw new HttpException('User Already Exist', HttpStatus.NOT_ACCEPTABLE);
    }

    const create = this.userepo.create({
      userEmail: data.userEmail,
      userPassword: data.userPassword,
      userName: data.userName,
      otp: otp,
    });

    this.userepo.save(create);

    return otp;
  }

  async VerifyAccount(data: Iverify) {
    const user = await this.userepo.findOneBy({ userEmail: data.userEmail });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }

    const newuser = await this.userepo.findOneBy({ otp: data.otp });

    if (!user) {
      throw new HttpException('otp is not correct', HttpStatus.NOT_FOUND);
    }
    user.otp = null;
    user.status = 'Approved';
    return this.userepo.save(user);
  }

  async LoginUser(data: ILogin) {
    const user = await this.userepo.findOneBy({ userEmail: data.userEmail });

    if (!user) {
      throw new HttpException(
        'UserName Or Password is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }
    const newuser = await this.userepo.findOneBy({
      userPassword: data.userPassword,
    });

    if (!user) {
      throw new HttpException(
        'UserName Or Password is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.status != 'Approved') {
      throw new HttpException('User Not Verified', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async ForgotPassword(data: IForgotpassword) {
    const user = await this.userepo.findOneBy({ userEmail: data.userEmail });

    if (!user) {
      throw new HttpException('User Does Not Exist!', HttpStatus.NOT_FOUND);
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.otp = otp;

    this.userepo.save(user);

    return otp;
  }

  async ResetPassword(data : IResettpassword) {
    const user = await this.userepo.findOneBy({userEmail: data.email});

    if (!user) {
      throw new HttpException('User Does Not Exist!', HttpStatus.NOT_FOUND);
    }

    if(user.otp != data.otp ){
      throw new HttpException('otp is Not Correct!', HttpStatus.NOT_FOUND);
    }

   user.userPassword = data.password

    this.userepo.save(user);

    return user;
  }



}
