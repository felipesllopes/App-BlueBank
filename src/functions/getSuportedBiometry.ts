import ReactNativeBiometrics from "react-native-biometrics";

/**
 * Function to find out if the device supports biometrics.
 * @param setSuportedBiometry
 */
export const getSuportedBiometry = async (
    setSuportedBiometry: (value: boolean) => void,
) => {
    const rnBiometrics = new ReactNativeBiometrics();

    await rnBiometrics.isSensorAvailable().then(resultObject => {
        if (resultObject.available) {
            setSuportedBiometry(true);
        } else {
            setSuportedBiometry(false);
        }
    });
};
