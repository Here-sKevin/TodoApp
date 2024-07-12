/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 7,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    fontSize:16,
  },
  inputError: {
    height: 60,
    paddingHorizontal: 20,
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F1F1F1',
    fontSize:16,
    borderWidth:1,
    borderColor: 'red'

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    width:'100%'
  },
  buttonContainer: {
    //flex: 1,
    //margin: 10,
    width:'100%'
  },
  stickyFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    alignItems: 'center',
    width:'100%'
  },
  
});
