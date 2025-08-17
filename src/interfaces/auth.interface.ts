export interface UserLoginInput {
    email: string;
    password: string;
}

export interface UserLoginOutput {
    id: string;
    roles: string[];
    token: string;
}