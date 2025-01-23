
export class Login{
    username!:string;
    password!:string;
}
export class token{
    token!:string;
    token_type!: string;
    role!:string;
    user!:string;
    Sid!:string;
    expiration!:string;
    
}
export class ResponseObj{
    created_id!:number;
    user!:string;
    data:any;
    message!:string;
}

export class ParsedAccessToken {
    
}