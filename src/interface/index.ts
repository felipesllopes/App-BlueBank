export interface IScreenNavigation {
    navigate: (screen: string) => void;
}

export interface IScreenNavigationProps {
    navigate: (screen: string, params?: IUser) => void;
}

export interface IScreenNavigationPixProps {
    navigate: (
        screen: string,
        params?: { value?: string; destinatary?: IUser },
    ) => void;
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
