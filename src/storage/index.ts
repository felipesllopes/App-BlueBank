import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../interface";

/**
 * Função para buscar dados de login
 * @param setIsChecked
 * @param setUser
 * @param setMountingScreen
 */
export const getItem = async (
    setIsChecked: (value: React.SetStateAction<boolean>) => void,
    setUser: (value: React.SetStateAction<IUser>) => void,
    setMountingScreen: (value: React.SetStateAction<boolean>) => void,
) => {
    await AsyncStorage.getItem("@keyBoolean")
        .then(async value => {
            if (value === "false") {
                setIsChecked(false);
                return;
            }
            if (value === "true") {
                setIsChecked(true);
                await AsyncStorage.getItem("@keyEmailUser").then(
                    async value => {
                        setUser(current => ({
                            ...current,
                            email: value,
                        }));
                    },
                );
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setMountingScreen(false);
        });
};

/**
 * Função para verificar preferência do usuário
 * @param valueBooleanString
 */
export const setPreference = async (valueBooleanString: "false" | "true") => {
    await AsyncStorage.setItem("@keyBoolean", valueBooleanString);
};

/**
 * Função para salvar email do usuário
 * @param email
 */
export const setEmail = async (email: string) => {
    await AsyncStorage.setItem("@keyEmailUser", email);
};

/**
 * Função para remover preferência e email do usuário
 * @param setUser
 * @param setIsChecked
 */
export const removeItem = async (
    setUser: (value: React.SetStateAction<IUser>) => void,
    setIsChecked: (value: React.SetStateAction<boolean>) => void,
) => {
    await AsyncStorage.clear().then(() => {
        setUser({} as IUser);
        setIsChecked(false);
    });
};

/**
 * Função para cadastrar biometria
 */
export const setBiometric = async () => {
    await AsyncStorage.setItem("@keyBiometric", JSON.stringify(true));
};

/**
 * Função para verificar valor da biometria
 */
export const getBiometric = async () => {
    try {
        const value = await AsyncStorage.getItem("@keyBiometric");
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error("Erro ao recuperar a preferência biométrica:", error);
        return null;
    }
};
