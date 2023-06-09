import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../context/auth";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function Profile() {

    const { user } = useContext(AuthContext);
    const navigation = useNavigation();
    const [image, setImage] = useState(null);

    useEffect(() => {
        console.log(image)
    }, [])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>

                {image ?
                    <Image source={{ uri: image }} style={styles.photo} />
                    :
                    <Image style={styles.photo} source={require('../../img/user-photo.jpg')} />
                }

                <FontAwesome name="camera" size={20} color={"#FFF"} />
                <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                    <Text style={styles.textButtonPhoto}>Editar foto</Text>
                </TouchableOpacity>
            </View>

            {user &&
                <View style={styles.body}>
                    <Text style={styles.tittle}>Meu perfil</Text>

                    <Text style={styles.topic}>Meus dados</Text>

                    <Text style={styles.text}>Nome</Text>
                    <Text style={styles.information}>{user.name} {user.lastName}</Text>

                    <Text style={styles.text}>Email</Text>
                    <Text style={styles.information}>{user.email}</Text>

                    <Text style={styles.text}>Telefone</Text>
                    <Text style={styles.information}>{ }</Text>

                    <Text style={styles.text}>CPF</Text>
                    <Text style={styles.information}>{user.cpf}</Text>


                    <Text style={styles.topic}>Endereço</Text>

                    <Text style={styles.text}>Logradouro</Text>
                    <Text style={styles.information}>{ }</Text>

                    <Text style={styles.text}>Complemento</Text>
                    <Text style={styles.information}>{ }</Text>

                    <Text style={styles.text}>Bairro</Text>
                    <Text style={styles.information}>{ }</Text>
                </View>
            }

            <TouchableOpacity
                style={styles.buttonEdit}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.textEdit}>Editar informações</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD8E6'
    },
    header: {
        backgroundColor: '#0000CD',
        alignItems: 'center',
        paddingVertical: 20,
    },
    photo: {
        backgroundColor: '#FFF',
        height: 100,
        width: 100,
        borderRadius: 80,
        marginBottom: 20,
    },
    textButtonPhoto: {
        color: '#FFF',
        marginTop: 10,
    },
    body: {
        padding: 10,
    },
    tittle: {
        textAlign: 'center',
        color: '#0000CD',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    topic: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#0000CD',
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    information: {
        fontSize: 18,
        marginHorizontal: 10,
        marginBottom: 10,
        padding: 3,
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderColor: '#0000CD',
        backgroundColor: '#BBDBE0',
    },
    buttonEdit: {
        alignItems: 'center',
        backgroundColor: '#87CEEB',
        marginVertical: 20,
        paddingVertical: 4,
        width: 220,
        alignSelf: 'center',
        borderRadius: 20,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#0000CD',
    },
    textEdit: {
        textAlign: 'center',
        fontSize: 19,
        fontWeight: 'bold',
        color: '#FFF',
    },
})