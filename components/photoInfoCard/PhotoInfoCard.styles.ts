/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        //backgroundColor:'#EDFEFF',
        
    },
    titleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal:17
      
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding:2,
      //backgroundColor:'#FFF1FC',
      borderRadius: 20,
      borderWidth:0.5,
      borderColor: 'lightgrey',
    },
    image: {
      width:100,
      height:100,
      borderRadius: 20
    }
    
})