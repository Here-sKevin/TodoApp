/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor:'#FFEDFD',
        padding:20,
        borderRadius: 50,
        height: 250
    },
    imageContainer: {
        flex:1,
        alignItems:'center',
        padding: 10,
        justifyContent: 'center'
    },
      textContainer: {
        flex:1,
        alignItems:'center',
        padding: 10,
        justifyContent: 'center'
      }
})