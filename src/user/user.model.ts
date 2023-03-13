import { ApiProperty } from "@nestjs/swagger";
import { IForgotpassword, ILogin, IResettpassword, ISignup, Iverify } from "./user.dto";

export class Signup implements ISignup{


    

    @ApiProperty()
    userEmail: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    userPassword: string;

    otp: number;

}


export class Verify implements Iverify{

    @ApiProperty()
    userEmail: string;
    
    @ApiProperty()
    otp: number;


}

export class Forgotpassword implements IForgotpassword{
    
    @ApiProperty()
    userEmail: string

}

export class Resettpassword implements IResettpassword{
  
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string
    @ApiProperty()
    otp: number;
}



export class Login implements ILogin{
    

    @ApiProperty()
    userEmail: string;

    @ApiProperty()
    userPassword: string;
    
  

}
