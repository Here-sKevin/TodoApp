/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
  wrapper: {
    height: 400,
    borderRadius: 20,
    //flex: 1,
    //alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)',
    borderWidth: 2,
    width: '95%',
    padding: 35
  }
});
