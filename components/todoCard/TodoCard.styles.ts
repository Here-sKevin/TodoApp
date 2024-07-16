/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    notChecked: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'#F4F4F4',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        alignItems:'center',
        borderWidth:1,
        borderColor:'#8D8D8D'
    },
    checked: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor:'#D7FFC4',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
      alignItems:'center',
      borderWidth:1,
      borderColor: '#84E258'

    },
    imageContainerChecked: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#84E258',
        borderRadius: 100,
        paddingHorizontal: 10,
        paddingVertical: 10
        //height:50
        
    },
    imageContainerNotchecked: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      //backgroundColor:'white',
      borderRadius: 100,
      paddingHorizontal: 10,
      paddingVertical: 10,

      borderWidth:1,
      borderColor:'#D7D7D7'
      
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
      imageChecked: {
        tintColor:'white'
      },
      imageNotChecked: {
        tintColor:'#D7D7D7',
      }
})