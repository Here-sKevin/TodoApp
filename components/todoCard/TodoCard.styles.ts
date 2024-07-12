/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        //width: '100%',
        backgroundColor:'#F4F4F4',
        //padding:10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems:'center'
    },
    containerCollapse: {
        flexDirection: 'row',
        //flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor:'#E5E5E5',
        paddingHorizontal: 20,
        paddingVertical: 10,
        //borderRadius: 10,
        borderTopStartRadius: 10
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
        borderRadius: 10,
        paddingHorizontal: 10,
        height:50
        
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
      },
      image: {
        //width: 30,
        //height: 30
      }
})