/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'transparent',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)',
  },
  approved: {
    backgroundColor: 'transparent',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'lightgreen',
  },
  title: {
    fontSize: 20,
    display: 'flex',
    textAlign: 'center',
  },
  button: {
    width: '50%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    gap:100
    //margin: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    padding: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 10, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 300,
  },
  list: {
    //paddingBottom: 100
    gap:5
  },
  stickyFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  cont: {
    flex:1,
    justifyContent:'center'
  }
});
