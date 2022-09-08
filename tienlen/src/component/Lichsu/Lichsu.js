/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Emojicon from 'react-native-emojicon';

function Lichsu({ route }) {
    const { id } = route.params;
    const [danhsachvan, setDanhsachvan] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let DATA = await AsyncStorage.getItem('@listGames');
            DATA = JSON.parse(DATA);
            const options = DATA.find(item => Number(item.id) === id);
            setDanhsachvan(options.data);
        };
        getData();
      }, []);


    console.log(1111, danhsachvan);
  return (
    <View style={{ flex: 1, backgroundColor: '#2196F3' }}>
        <View style={styles.containerHeader}>
            <View>
                <Text style={styles.lichsuText}>Lịch sử</Text>
            </View>
            <View>
                <View style={styles.van}>
                    <Text style={styles.tongvan}>Ván: {0}</Text>
                </View>
            </View>
        </View>
        <View style={styles.emoji}>
            {danhsachvan.length > 0 &&
                 danhsachvan.map((item, index) => {
                    return (
                        <View style={styles.item} key={index}>
                            <Emojicon name={'rage'} size={50} />
                            <Text style={styles.nameText}>{ item.name }</Text>
                        </View>
                    )
                 })

            }
{/* 
            <View style={styles.item}>
                <Emojicon name={'rage'} size={50} />
                <Text style={styles.nameText}>ádsadsadsa</Text>
            </View>
            <View style={styles.item}>
                <Emojicon name={'rage'} size={50} />
                <Text style={styles.nameText}>ádsadsadsa</Text>
            </View>
            <View style={styles.item}>
                <Emojicon name={'rage'} size={50} />
                <Text style={styles.nameText}>ádsadsadsa</Text>
            </View> */}
        </View>
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    {danhsachvan.length > 0 &&
                        danhsachvan.map((item, i) => {
                            return (
                                <View style={styles.item} key={i}>
                                    {item.arr.map((point, j) => {
                                        return (
                                            <TextInput key={j}
                                            style={[styles.input, { backgroundColor: j % 2 === 0 ? '#3d7989' : '#7ea1aa' }]}
                                            value={`${point}`}
                                            keyboardType="numeric"
                                            // eslint-disable-next-line react-native/no-inline-styles
                                            />
                                        )
                                    })
                                    }
                                </View>
                                );
                            })
                    }
                </View>
            </ScrollView>
        </View>

    </View>
  ) 
}

export default Lichsu;


const styles = StyleSheet.create({
    containerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#2196F3',
    },
    lichsuText: {
      fontSize: 20,
      color: 'white'
    },
    van: {
      width: 60,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10,
    },
    tongvan: {
      fontSize: 16,
      color: 'white'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        alignItems: 'center',
    },
    main: {
        flex: 1,
    },
    input: {
        height: 40,
        padding: 10,
        width: '100%',
        textAlign: 'center',
    },
    emoji: {
        flexDirection: 'row',
        zIndex: 1000,
    },
    nameText: {
        color: 'white',
        fontSize: 16,
    },
  });