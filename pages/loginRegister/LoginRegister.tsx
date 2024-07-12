/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Tabs } from "../../components/ui/Tabs";
import { Text } from "../../components/ui/Text";
import { Image, Keyboard, TextInput, View } from "react-native";
import useAuthentication from "../../shared/authentication/hooks/useAuthentication";
import { useLoginModel } from "../signin/interface/LoginModel";
import { styles } from "./LoginRegister.styles";
import { Button as ButtonComp } from '../../components/ui/Button'
import { useRegisterModel } from "../signup/interface/RegisterModel";
import SignUpScreenApi from "../signup/SignUpScreenApi";
import SignInScreenApi from "../signin/SignInScreenApi";
import FormControl from "../../components/ui/FormControl";
import BaseLayout from "../../components/layout/baseLayout/BaseLayout";

const tabs = [
    {value: 'tab1', title: 'Sign In'},
    {value: 'tab2', title: 'Sign Up'},
  ];

const LoginRegister = () => {
    const {login} = useAuthentication();
    const [collapse, setCollapse] = useState(false);
    const {
		field,
		handleSubmit,
        getErrors,
        hasError,
	} = useLoginModel();


    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
          'keyboardDidHide',
          () => {
            console.log('Keyboard is hidden');
            setCollapse(false)
          }
        );
    
        return () => {
          keyboardDidHideListener.remove();
        };
      }, []);

    const handleCollapse = () => {
        setCollapse(true)
    }

        const onSubmitRegister = handleSubmit(async (data) => {
            await SignUpScreenApi.signUp(data);
        });

        const onSubmitLogin = handleSubmit(async (data) => {
            const u = await SignInScreenApi.signIn(data);
            if(Object.entries(u).length > 0)
                login(data.username, data.password, u[0].id)
        });

    return (
        <BaseLayout camera={false}>
            {!collapse && (
                <View style={{height: 400, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../images/account.png')} />
                    <Text size="xxl" fontWeight="bold">Sign In or Sign Up</Text>
                </View>
            )}
            
            <Tabs defaultValue={tabs[0].value}>
            <Tabs.List>
                {tabs.map((tab) => {
                return <Tabs.Tab key={tab.value} value={tab.value} title={tab.title} />;
                })}
            </Tabs.List> 
            <Tabs.Content value={tabs[0].value}>
                <View style={styles.container}>
                <FormControl errors={getErrors('username')}>
                    <TextInput style={hasError('username') ? styles.inputError : styles.input} placeholder='Username' onPress={handleCollapse} onChangeText={(e) => field('username').onChange(e)} />
                </FormControl>
                <FormControl errors={getErrors('password')}>
                    <TextInput style={hasError('password') ? styles.inputError : styles.input} placeholder='Password' onPress={handleCollapse} secureTextEntry onChangeText={(e) => field('password').onChange(e)} />
                </FormControl>
                    
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ButtonComp title='Sign In' size='md' onPress={() => onSubmitLogin()}/>
                        </View>
                    </View>       
                </View>     
            </Tabs.Content>
            <Tabs.Content value={tabs[1].value}>
                <View style={styles.container}>
                <FormControl errors={getErrors('username')}>
                    <TextInput style={hasError('username') ? styles.inputError : styles.input} placeholder='Username' onPress={handleCollapse} onChangeText={(e) => field('username').onChange(e)} />
                </FormControl>
                <FormControl errors={getErrors('password')}>
                    <TextInput style={hasError('password') ? styles.inputError : styles.input} placeholder='Password' onPress={handleCollapse} secureTextEntry onChangeText={(e) => field('password').onChange(e)} />
                </FormControl>
                    
                    
                    <View style={styles.row}>
                        <View style={styles.buttonContainer}>
                            <ButtonComp title='Sign Up' onPress={() => onSubmitRegister()}/>
                        </View>
                    </View>       
                </View>
            </Tabs.Content>
            </Tabs>
    
        </BaseLayout>
       
    )
}

export default LoginRegister;