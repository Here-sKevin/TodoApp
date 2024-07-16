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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    //alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    gap:30
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: 'lightgray',
    borderBottomWidth:1,
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
    padding: 30,

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
