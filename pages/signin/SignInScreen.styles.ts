/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)'
  },
  input: {
    height: 70,
    borderColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '90%',
    borderRadius: 10
  },
  displayText: {
    fontSize: 18,
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
    backgroundColor:'white',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40
  },
  image: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
