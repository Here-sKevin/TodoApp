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
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize:17

  },
  inputError: {
    height: 60,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '90%',
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize:17,
    borderWidth:1,
    borderColor: 'red'

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
  },
  
});
