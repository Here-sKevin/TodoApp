/* eslint-disable prettier/prettier */
import React,{ ReactNode } from "react";
import { Text, View } from "react-native";


type Props = {
	children?: ReactNode
	errors?: string[]
}
const FormControl: React.FC<Props> = ({ children, errors }: Props) => {
  return (
    <View style={{width:'100%' }}>
      {children}
      {errors ? (
        Array.from(new Set(errors).values()).map((error) => (
          <Text style={{color: 'red', justifyContent: 'center', alignItems: 'flex-start', fontSize: 12, paddingVertical:10, padding:5}}>
            {error}
          </Text>
        ))
      ) : (
        <></>
      )}
    </View>
  );
};

export default FormControl;
