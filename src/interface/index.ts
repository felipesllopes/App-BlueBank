export interface IScreenNavigation {
    navigate: (screen: string) => void;
}

export interface IFormLogin {
    email: string;
    password: string;
}

export interface IFormRegister {
    email: string;
    name: string;
    cpf: string;
    password: string;
    confirmPassword: string;
}

export interface IUser {
    name: string;
    cpf: string;
    balance: number;
    email: string;
    uid: string;
}
