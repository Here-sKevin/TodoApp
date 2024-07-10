/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor:'#E5E5E5',
        padding:20,
        borderRadius: 10,
    },
    containerCollapse: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor:'#E5E5E5',
        padding:20,
        //borderRadius: 10,
        borderTopStartRadius: 10
    },
    imageContainer: {
        flex:0.4,
        alignItems:'center',
        padding: 10,
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 100,
        //height: 40
    },
      textContainer: {
        flex:1,
        alignItems:'center',
        padding: 10,
        justifyContent: 'center'
      },
      buttonContainer: {
        flexDirection: 'row',
        //flex: 1,
        //justifyContent: 'space-between',
        width: '100%',
        //alignItems: 'center',
        padding:10,
        backgroundColor:'#E5E5E5',
        borderBottomStartRadius: 10
      },
      button: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        padding: 10
      }
})