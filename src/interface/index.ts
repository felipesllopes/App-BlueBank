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

export interface IFormResetPassword {
    email: string;
}

export interface IUser {
    name: string;
    cpf: string;
    balance: number;
    email: string;
    uid: string;
}

export interface ITransactions {
    balance: number;
    date: string;
    type: string;
    value: number;
    debit: boolean;
    participant: string;
}

export interface IFormEditProfile {
    name: string;
    email: string;
    cpf: string;
}

export interface ISliders {
    mdpi: string;
    hdpi: string;
    xhdpi: string;
    xxhdpi: string;
    xxxhdpi: string;
    title: string;
}
