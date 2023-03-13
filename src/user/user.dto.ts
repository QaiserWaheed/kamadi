export interface  ISignup{

userEmail: string

userName: string

userPassword: string

otp : number

}



export interface Iverify{

userEmail: string

otp : number

}


export interface IForgotpassword{

    userEmail: string

}

export interface IResettpassword{


    email: string

    password: string
    
    otp: number
   

}

export interface  ILogin{

    userEmail: string
    
    userPassword: string

    }