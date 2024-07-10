/* eslint-disable prettier/prettier */
import React, { useEffect } from "react"
import { Text, View } from "react-native";
import { useDb } from "../database/hooks/useDb";
import RNBootSplash  from "react-native-bootsplash";

type Props = {
    children: React.ReactNode;
}

function DatabaseProvider ({children} : Props) {
    const {success, error } = useDb();
    useEffect(() => {
        if (success) {
            RNBootSplash.hide({ fade: true, duration: 500 });
        }
    }, [success])

    if(error) {
        return(
            <View>
                <Text>Error: {error.message}</Text>
            </View>
        )
    }
    return children;
}

export default DatabaseProvider;