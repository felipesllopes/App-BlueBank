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
    const [visibleBalance, setVisibleBalance] = useState(false);
    const opacity = 0.7;

    useEffect(() => {
        firebase.database().ref('usuario').child(user && user.uid).on('value', (snapshot) => {
            setBalance(snapshot.val().saldo);
        })
    }, [visibleBalance])

    function navegate(pag) {
        navigation.navigate(pag)
    }

    async function handleLogout() {
        logout();
    }

    function handlevisibleBalance() {
        setVisibleBalance(current => (current === true ? false : true))
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.boxSalutation}>
                    <Image source={require('../../img/logo-bb.png')} style={styles.logo} />
                    <Text style={styles.bankName}>Blue Bank</Text>
                </View>
                <Text style={styles.welcome}>Olá, {user && user.name}!</Text>

                <View style={styles.showBalance}>
                    <Text style={styles.balance}>Saldo disponível</Text>
                    <TouchableOpacity activeOpacity={opacity} onPress={() => handlevisibleBalance()}>
                        <FontAwesome
                            name={visibleBalance ? 'caret-down' : 'caret-up'}
                            size={30} color={'white'}
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style={[styles.balance, { display: visibleBalance ? 'flex' : 'none' }]}>R${balance.toLocaleString('pr-BR', { minimumFractionDigits: 2 })}
                </Text>
            </View>

            <View style={styles.boxButtons}>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Pix')} activeOpacity={opacity}>
                    <Image source={require("../../img/pix.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Pix</Text>
                </TouchableOpacity>

            </View>

            <View style={styles.boxButtons}>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Payment')} activeOpacity={opacity}>
                    <Image source={require("../../img/payment.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Pagamento</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cardButtons} onPress={() => navegate('Transfer')} activeOpacity={opacity}>
                    <Image source={require("../../img/transfer.png")} style={styles.imageCard} />
                    <Text style={styles.nameCard}>Transferência</Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.help} activeOpacity={opacity}>
                <View style={styles.alignIcon}>
                    <Text style={styles.helpTittle}>Precisa de ajuda?</Text>
                    <FontAwesome name="question-circle-o" size={22} color={'black'} />
                </View>
                <Text style={styles.helpText}>Entre em contato conosco e converse com um de nossos atendentes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.help} onPress={() => navegate('Contract')} activeOpacity={opacity}>
                <View style={styles.alignIcon}>
                    <Text style={styles.helpTittle}>Contrato</Text>
                    <FontAwesome name="file-text-o" size={22} color={'black'} />
                </View>
                <Text style={styles.helpText}>Leia os termos de contrato</Text>
            </TouchableOpacity>


            <TouchableOpacity activeOpacity={opacity} style={styles.logoutButton} onPress={handleLogout}>
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
        marginBottom: 20,
        height: 180,
        shadowOpacity: 1,
        elevation: 10, 
    },
    boxSalutation: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        height: 35,
        width: 35,
    },
    bankName: {
        fontSize: 23,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#FFF'
    },
    welcome: {
        fontSize: 17,
        color: '#FFF',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    showBalance: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    balance: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFF'
    },
    boxButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    cardButtons: {
        height: 100,
        width: 120,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        shadowOpacity: 1,
        elevation: 4,
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
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 6,
        marginHorizontal: 10,
        marginBottom: 20,
        shadowOpacity: 1,
        elevation: 4, 
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
        marginTop: 40,
        shadowOpacity: 1,
        elevation: 3, 
    },
    logoutText: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
    }
})