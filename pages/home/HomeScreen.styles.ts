/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    //backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonContainerCancel: {
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
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)',
    borderWidth: 2,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 350,
    height: 250,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',

  },
  title_guide: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)'
  },
  content_guide: {
    fontSize: 13,
    //fontWeight: 'bold',
  },
});
