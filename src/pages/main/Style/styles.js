import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ADD8E6'
    },
    logo: {
        height: 130,
        width: 130,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 10
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
        marginLeft: 10,
    },
    textInput: {
        fontSize: 18,
        marginVertical: 4,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 2,
        paddingHorizontal: 10,
        height: 44,
        borderRadius: 4,
        fontSize: 18,
        marginBottom: 5,
        backgroundColor: 'white'
    },
    viewButton: {
        alignItems: 'center',
        marginTop: 12,
    },
    enterButton: {
        backgroundColor: '#00BFFF',
        padding: 5,
        borderRadius: 10,
        width: '100%',
        marginVertical: 14,
    },
    textButton: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF'
    },
})

export default styles;