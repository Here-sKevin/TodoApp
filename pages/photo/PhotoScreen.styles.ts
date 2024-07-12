/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    //flexDirection: 'row',
    //justifyContent: 'space-around',
    margin: 10,
    padding: 10
  },
  buttonContainer: {
    //flex: 1,
    margin: 10,
    //width:'15%',
    flexDirection:'row',
    alignItems:'center'
  },
  root: { flexGrow: 0 },
  container: {
    flex: 1,
    paddingLeft: 10,
    marginBottom: 10
  },
  button: {
    marginRight: 10
  },
  imageContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageWrapper: {
    //flex: 1,
    //justifyContent: 'space-around',
    margin: 2
    //padding:2
  },
  image: {
    width: (Dimensions.get('window').width - (3 + 1) * 2) / 3,
    height: (Dimensions.get('window').width - (3 + 1) * 2) / 3,
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
});
