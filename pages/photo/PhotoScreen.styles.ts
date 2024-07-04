/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    margin: 10,
  },
  root: { flexGrow: 0 },
  container: {
    flex: 0,
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
    flex: 1,
    margin: 2,
  },
  image: {
    width: (Dimensions.get('window').width - (3 + 1) * 2) / 3,
    height: (Dimensions.get('window').width - (3 + 1) * 2) / 3,
  },
});
