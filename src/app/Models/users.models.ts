export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }

  export interface UserLogin{
    email: string;
    password: string;
  } 

  export interface UserRegister{
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  } 

  export interface code{
    code: string
  }

  export interface Chat {
    text: string;
    encryptedText: string;
    originalText: string;
    decryptedText: string;
    
}