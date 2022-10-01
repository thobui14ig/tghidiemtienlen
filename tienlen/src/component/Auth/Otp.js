/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const randomCode = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
function Otp() {
    const navigation = useNavigation();
    const input = useRef();
    const [code, setCode] = useState(null);
    const [clearInputs, setClearInputs] = useState(false)
    // useEffect(() => {
    //     setCodeRandom();
    // }, []);

    const setCodeRandom = () => {
        let number = randomCode();
        setCode(number);
    };

    const onCodeFilled = (otp) => {
        if (otp.length === 4) {
            if (Number(otp) === Number(code)) {
                setCode(null);
                navigation.navigate('MyTabs')
            } else {
                setTimeout(() => {
                    setClearInputs(true);
                    input.current.focusField(0);
                    input.current.state.digits = [];
                    setClearInputs(false);
                }, 200);
            }
        }
    };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
        onPress={() => setCodeRandom()}
            title="Get code"
            color="#841584"
        />
        <Text style={styles.code}>{code}</Text>
        <OTPInputView
            ref={input}
            style={{width: '80%', height: 50, color: 'red'}}
            pinCount={4}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged = {(otp) => onCodeFilled(otp)}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled = {(otp) => onCodeFilled(otp)}
            clearInputs={clearInputs}

        />
    </View>
  );
}

export default Otp;

const styles = StyleSheet.create({
    borderStyleBase: {
      width: 30,
      height: 45,
    },
    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },
    underlineStyleBase: {
    //   width: 30,
    //   height: 45,
      borderWidth: 2,
      color: 'red', 
      fontSize: 16,
      borderColor: 'black',
    },
    code: {
        fontSize: 20,
        marginVertical: 30,
    },
});