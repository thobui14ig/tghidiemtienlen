/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useMain } from '../../context/Main.context';

function Input({ number }) {
    const { ok } = useMain();
    const { setpoint } = useMain();
    const [text, onChangeText] = React.useState();

    const handleChangePoint = (e) => {
        onChangeText(e);
        setpoint(e, number);
    };

    useEffect(() => {
        onChangeText();
    }, [ok]);

    return (
        <TextInput onChangeText={(e) => handleChangePoint(e)}
        style={styles.input}
        value={text ? text.toString() : ''}
        keyboardType="numeric"
        />
    );
}

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    borderRightWidth: 1,
    flex: 1,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '90%',
    margin: 5,
    textAlign: 'center',
    backgroundColor: 'white'
  },
});
