/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor:'#EDFEFF',
        padding:20,
        borderRadius: 50,
        height: 250
    },
    circles: {
        //flexDirection: 'row',
        //alignItems: 'center',
      },
      progress: {
        //margin: 10,
      },
      textContainer: {
        flex:1,
        alignItems:'center',
        padding: 10,
        justifyContent: 'center'
      },
      imageContainer: {
        flex:1,
        alignItems:'center',
        padding: 10,
        justifyContent: 'center'
    },
})