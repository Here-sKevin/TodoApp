/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25
        //width: '80%'

    },
    buttonContainer: {
        borderRadius: 20,
        //backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgrey',
        padding:16
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEDED',

    },
    image: {
        width: 35,
        height: 35,
    },
    buttonImage: {
        width: 20,
        height: 20,
    },
})