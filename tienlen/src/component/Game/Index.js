/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function Game() {
    const navigation = useNavigation();
    const tienlen = () => {
        navigation.navigate('Gametienlen');
    };
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <TouchableOpacity style={styles.item} onPress={ () => tienlen() }>
                <View>
                    <Text style={styles.itemText}>Tiến lên</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <View>
                    <Text style={styles.itemText}>Đang tải</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <View>
                    <Text style={styles.itemText}>Đang tải</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <View>
                    <Text style={styles.itemText}>Đang tải</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2196F3',
    },
    content: {
        flexWrap: 'wrap',
        flex: 1,
        marginVertical: 200,
        flexDirection: 'row',
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#425364'
    },
    item: {
        width: '48%',
        height: '48%',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%',
        borderRadius: 5,
        backgroundColor: '#9e5bc0',
    },
    itemText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
});