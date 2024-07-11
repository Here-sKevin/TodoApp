/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%'

    },
    buttonContainer: {
        width: 50,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white',
        borderWidth:1,
        borderColor: 'lightgrey'
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 5,
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