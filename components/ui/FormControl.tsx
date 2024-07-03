/* eslint-disable prettier/prettier */
import React,{ ReactNode } from "react";
import { Text, View } from "react-native";


type Props = {
	children?: ReactNode
	errors?: string[]
}
const FormControl: React.FC<Props> = ({ children, errors }: Props) => {
  return (
    <View style={{width:'95%', alignItems: 'center'}}>
      {children}
      {errors ? (
        Array.from(new Set(errors).values()).map((error) => (
          <Text style={{color: 'red'}}>
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
