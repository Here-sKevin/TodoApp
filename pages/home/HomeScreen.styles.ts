/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center'
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
    //borderColor: 'linear-gradient(109.6deg, rgb(5, 84, 94) 16%, rgb(187, 187, 187) 91.1%)',
    //borderWidth: 2,
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
  dropdownButtonStyle: {
    //flex: 1,
    //height: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 45,
    paddingVertical: 12,
    borderWidth:1,
    borderColor: 'lightgrey',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownMenuStyle: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 100,
  },
  dropdownItemStyle: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B1BDC8',
    backgroundColor: 'white'
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
    textAlign: 'center',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  selectcontainer: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  notification: {
    borderRadius: 20,
    //backgroundColor: 'white',
    borderWidth:1,
    borderColor: 'lightgrey',
    padding:16
},
notificationImage: {
  width: 25,
  height: 25,
},
});
