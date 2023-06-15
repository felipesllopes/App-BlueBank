import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from '../../context/auth';
import firebase from '../../firebase/firebaseConnection';

export default function Home() {

    const navigation = useNavigation();
    const { user, logout } = useContext(AuthContext);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        firebase.database().ref('usuario').child(user && user.uid).on('value', (snapshot) => {
            setBalance(snapshot.val().saldo);
        })
    }, [])

    function navegate(pag) {
        navigation.navigate(pag)
    }

    async function handleLogout() {
        logout();
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.boxSalutation}>
                    <Image source={require('../../img/logo-bb.png')} style={styles.logo} />
                    <Text style={styles.bankName}>Blue Bank</Text>
                </View>
                <Text style={styles.welcome}>Olá, {user && user.name}!</Text>
                <Text style={styles.balance}>Saldo disponível</Text>
                <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Payment')} activeOpacity={0.7}>
                    <Image source={require("../../img/payment.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Pagamento</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Pix')} activeOpacity={0.7}>
                    <Image source={require("../../img/pix.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Pix</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Transfer')} activeOpacity={0.7}>
                    <Image source={require("../../img/transfer.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Transferência</Text>
                </TouchableOpacity>

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Withdraw')} activeOpacity={0.7}>
                    <Image source={require("../../img/withdraw.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Saque</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Deposit')} activeOpacity={0.7}>
                    <Image source={require("../../img/deposit.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Depósito</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.help} activeOpacity={0.7}>
                <View style={styles.alignIcon}>
                    <Text style={styles.helpTittle}>Precisa de ajuda?</Text>
                    <FontAwesome name="question-circle-o" size={22} color={'black'} />
                </View>
                <Text style={styles.helpText}>Entre em contato conosco e converse com um de nossos atendentes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.help} onPress={() => navegate('Contract')} activeOpacity={0.7}>
                <View style={styles.alignIcon}>
                    <Text style={styles.helpTittle}>Contrato</Text>
                    <FontAwesome name="file-text-o" size={22} color={'black'} />
                </View>
                <Text style={styles.helpText}>Leia os termos de contrato</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6',
    },
    header: {
        backgroundColor: '#0000CD',
        padding: 10,
        paddingBottom: 20,
        marginBottom: 40,
    },
    boxSalutation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    logo: {
        height: 35,
        width: 35,
    },
    bankName: {
        fontSize: 23,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'white'
    },
    welcome: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    balance: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        color: 'white'
    },
    cardButtons: {
        height: 100,
        width: 120,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginBottom: 20,
    },
    imageCard: {
        height: 40,
        width: 40,
    },
    nameCard: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 8,
    },
    help: {
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        padding: 6,
    },
    alignIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpTittle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 6,
    },
    helpText: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#0000CD',
        paddingVertical: 4,
        margin: 10,
        borderRadius: 10,
    },
    logoutText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    }
})