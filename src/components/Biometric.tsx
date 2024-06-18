import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

const rnBiometrics = new ReactNativeBiometrics();

export const BiometricAuth = () => {
    const [biometryType, setBiometryType] = useState(null);

    useEffect(() => {
        rnBiometrics.isSensorAvailable().then(resultObject => {
            const { available, biometryType } = resultObject;
            if (available) {
                setBiometryType(biometryType);
            } else {
                Alert.alert("Biometrics not supported");
            }
        });
    }, []);

    const handleBiometricAuth = () => {
        rnBiometrics
            .simplePrompt({ promptMessage: "Confirm fingerprint" })
            .then(resultObject => {
                const { success } = resultObject;
                if (success) {
                    Alert.alert("Authenticated successfully");
                } else {
                    Alert.alert("User cancelled biometric prompt");
                }
            })
            .catch(() => {
                Alert.alert("Biometric authentication failed");
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Biometric Authentication</Text>
            {biometryType && (
                <Text style={styles.text}>Biometry Type: {biometryType}</Text>
            )}
            <Button title="Authenticate" onPress={handleBiometricAuth} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});
