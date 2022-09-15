/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Emojicon from 'react-native-emojicon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMain } from '../../../../context/Main.context';


const EmojiHOC = () => {
    const { emoji } = useMain();

    return <Emoji emoji={emoji}/>;
};
const Emoji = React.memo(({ emoji }) => {
    const [danhsachnguoichoi, setDanhsachnguoichoi] = useState([]);
    const [listPosition, setListPosition] = useState([
        { id: 1, emoji: '' },
        { id: 2, emoji: '' },
        { id: 3, emoji: '' },
        { id: 4, emoji: '' },
    ]);
    useEffect(() => {
        const getData = async () => {
            const DATA = await AsyncStorage.getItem('@danhsachnguoichoi');
            setDanhsachnguoichoi(JSON.parse(DATA));
        };

        getData();

        setListPosition([
            { id: 1, emoji: '' },
            { id: 2, emoji: '' },
            { id: 3, emoji: '' },
            { id: 4, emoji: '' },
        ])
    }, []);

    useEffect(() => {
        emoji.sort((a, b) => { //sắp xếp vị trí từ 1 đến 4
            return a.point - b.point;
        });
        emoji.map((item, index) => {
            const data = listPosition.find(item1 => item1.id === item.id);
            data.emoji = getEmoji(index);
        });

        setListPosition([...listPosition]);

    }, [emoji]);

    const getEmoji = (value) => {
        if (value === 0) {return 'rage';}
        if (value === 1) {return 'weary';}
        if (value === 2) {return 'relaxed';}
        if (value === 3) {return 'joy';}
    };

  return (
    <View style={styles.container}>
        {danhsachnguoichoi.length > 0 &&
            <>
                <View style={styles.item}>
                    <Emojicon name={listPosition[0].emoji === '' ? 'rage' : listPosition[0].emoji} size={50} />
                    <Text style={styles.nameText}>{ danhsachnguoichoi[0].name }</Text>
                </View>
                <View style={styles.item}>
                    <Emojicon name={listPosition[1].emoji === '' ? 'rage' : listPosition[1].emoji} size={50} />
                    <Text style={styles.nameText}>{ danhsachnguoichoi[1].name }</Text>
                </View>
                <View style={styles.item}>
                    <Emojicon name={listPosition[2].emoji === '' ? 'rage' : listPosition[2].emoji} size={50} />
                    <Text style={styles.nameText}>{ danhsachnguoichoi[2].name }</Text>
                </View>
                <View style={styles.item}>
                    <Emojicon name={listPosition[3].emoji === '' ? 'rage' : listPosition[3].emoji} size={50} />
                    <Text style={styles.nameText}>{ danhsachnguoichoi[3].name }</Text>
                </View>
            </>

        }

    </View>
  );
});

export default EmojiHOC;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    //   backgroundColor: 'white',
      zIndex: 1000,
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameText: {
        color: 'white',
        fontSize: 16,
    },
  });
