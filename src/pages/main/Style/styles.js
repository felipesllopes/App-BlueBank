import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ADD8E6'
    },
    logo: {
        height: 125,
        width: 125,
        alignSelf: 'center',
        marginVertical: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 24,
    },
    salutation: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    slogan: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444',
        marginBottom: 20,
        marginHorizontal: 10,
        backgroundColor: '#FFF',// personalizar
    },
    input: {
        borderWidth: 2,
        paddingHorizontal: 10,
        height: 42,
        borderRadius: 6,
        fontSize: 18,
        marginBottom: 20,
        backgroundColor: 'white',
        shadowOpacity: 1,
        elevation: 3,
    },
    viewButton: {
        alignItems: 'center',
    },
    enterButton: {
        backgroundColor: '#00BFFF',
        padding: 5,
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
        marginTop: 10,
        shadowOpacity: 1,
        elevation: 3,
        borderWidth: 2,
        borderColor: '#00BBFF'
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF'
    },
    chageScreen: {
        fontSize: 17,
        textDecorationLine: 'underline',
    }
})

export default styles;