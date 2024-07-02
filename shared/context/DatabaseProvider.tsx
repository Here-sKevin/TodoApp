/* eslint-disable prettier/prettier */
import React from "react"
import { Text, View } from "react-native";
import { useDb } from "../database/hooks/useDb";

type Props = {
    children: React.ReactNode;
}

function DatabaseProvider ({children} : Props) {
    const {success, error } = useDb();
    if (!success) {
        return (
            <View>
                <Text>Migrating ...</Text>
            </View>
        )
    }
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