import { getBiometric } from "../storage";

/**
 * Function to find out if you have biometrics registered in the app.
 * @param setIsBiometry
 */
export const getHaveBiometrics = async (
    setIsBiometry: (value: boolean) => void,
) => {
    await getBiometric().then(async value => {
        setIsBiometry(await value);
    });
};
