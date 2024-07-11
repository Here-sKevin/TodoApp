/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        //backgroundColor:'#EDFEFF',
        height: 250
    },
    titleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width:'90%'
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:10,
      //backgroundColor:'#FFF1FC',
      borderRadius: 10
    },
    image: {
      width:70,
      height:70,
      borderRadius: 5
    }
    
})