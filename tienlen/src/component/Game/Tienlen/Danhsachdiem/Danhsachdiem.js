/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMain } from '../../../../context/Main.context';

// const Item = ({ title }) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{title}</Text>
//     </View>
//   );
  
function Danhsachdiem({ navigation }) {
    let { arrPoint, editPoint, setpoint, vanTieptheo, isShowEnd, setShowEnd, isShowAddPoint, setIsShowAddPoint, isKetqua, setIsKetqua, ketThuc, tongsovan, setTongsovan } = useMain();

    const [danhsachnguoichoi, setDanhsachnguoichoi] = useState([]);
    const [personWin, setPersonWin] = useState({ key: 0, point: 0 })

    const huy = () => {
        setIsShowAddPoint(!isShowAddPoint);
    }

    const addDiem = () => {
        setIsShowAddPoint(!isShowAddPoint);
        setTongsovan(tongsovan + 1);
        vanTieptheo();
    }

    useEffect(() => {
        const getData = async () => {
            const DATA = await AsyncStorage.getItem('@danhsachnguoichoi');
            setDanhsachnguoichoi(JSON.parse(DATA));
        };

        getData();
    }, []);

    useEffect(() => {
        let newDanhsachnguoichoi = danhsachnguoichoi.map((item, index) => {
            let data = arrPoint.find(item1 => item1.id === index + 1)
            let total = getTotal(data.arr)
            return { ...item, total }
        })

        const position = newDanhsachnguoichoi.map(item => {
            return { id: item.id, point: item.total }
        })
        position.sort((a, b) => { //sắp xếp vị trí từ 1 đến 4
            return a.point - b.point;
        });
        position.map((item, index) => {
            const data = newDanhsachnguoichoi.find(item1 => item1.id === item.id);
            data.ketqua = getKetqua(index + 1);
            data.color = getColor(index + 1);
        });

        setDanhsachnguoichoi(newDanhsachnguoichoi);

    }, [arrPoint])

    const getTotal = (arr) => {
        return arr.reduce((a, b) => Number(a) + Number(b), 0)
    };

    const getKetqua = (value) => {
        if (value === 1 || value === 2) {return 'Thua';}
        if (value === 3 || value === 4) {return 'Thắng';}

    };

    const getColor = (value) => {
        if (value === 1 || value === 2) {return '#0970cd';}
        if (value === 3 || value === 4) {return 'red';}

    };

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }} >
                <View style={{ flex: 1 }}>
                    <Text 
                        style={[styles.input]}
                        >{arrPoint[0]['arr'][index]}
                    </Text>                    
                </View>
                <View style={{ flex: 1 }}>
                    <Text 
                        style={[styles.input]}
                        >{arrPoint[1]['arr'][index]}
                    </Text>                    
                </View>
                <View style={{ flex: 1 }}>
                    <Text 
                        style={[styles.input]}
                        >{arrPoint[2]['arr'][index]}
                    </Text>                    
                </View>
                <View style={{ flex: 1 }}>
                    <Text 
                        style={[styles.input]}
                        >{arrPoint[3]['arr'][index]}
                    </Text>                    
                </View>


            </View>
           
        )        
    }
     



    // let arr = [{"arr": [1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2], "id": 1}, {"arr": [1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2], "id": 2}, {"arr": [1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2], "id": 3}, {"arr": [1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2], "id": 4}]
    // console.log(222222222, arrPoint);
  return (
    <>
        <SafeAreaView >
            <View style={styles.container}>
                <FlatList
                    data={arrPoint[0]['arr']}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </SafeAreaView>        


        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowAddPoint}
            >
                <View style={styles.modal}>
                    <View style={[styles.modalView] }>
                        <Text style={styles.modalText}>Nhập điểm: </Text>
                        <View style={{ flex: 10 }}>
                            {danhsachnguoichoi.length > 0 &&
                                danhsachnguoichoi.map((item, index) => {
                                    return (
                                        <View style={styles.itemNhapdiem} key={index}>
                                            <Text style={styles.textName}>{item.name}</Text>
                                            <TextInput
                                                keyboardType="numeric"
                                                style={styles.inputAdd}
                                                onChangeText={(e) => setpoint(e, index + 1)}
                                            />                                
                                        </View>                                        
                                    )
                                })

                            }
                        </View>
            
                        <View style={styles.button}>
                            <Pressable
                                style={[ styles.buttonItem]}
                                onPress={addDiem}
                                >
                                <Text style={styles.textStyle}>Ok luôn</Text>
                            </Pressable>

                            <Pressable
                                style={[ styles.buttonItem]}
                                onPress={huy}
                                >
                                <Text style={styles.textStyle}>Hủy</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>

        <View style={styles.end}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowEnd}
            >
                <View style={styles.endModal}>
                    <View style={[styles.endModalView] }>
                        <Text style={styles.modalText}>Kết thúc sớm bớt đau khổ</Text>
                        <View style={[styles.button]}>
                            <Pressable
                                style={[ styles.buttonItem, { margin: 20 }]}
                                onPress={() => {
                                    setShowEnd(!isShowEnd)
                                    setIsKetqua(true);
                                }}
                                >
                                <Text style={styles.textStyle}>Ok luôn</Text>
                            </Pressable>

                            <Pressable
                                style={[ styles.buttonItem, { margin: 20 }]}
                                onPress={() => {
                                    setShowEnd(!isShowEnd)
                                }}
                                >
                                <Text style={styles.textStyle}>Hủy</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>
        <View style={styles.end}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isKetqua}
            >
                <View style={styles.endModal}>
                    <View style={[styles.ketquaModalView] }>
                        {isKetqua &&
                            <Text style={styles.modalText}>Chúc mừng Bác {danhsachnguoichoi[personWin.key].name}!</Text>
                        }
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1, }}>
                            {danhsachnguoichoi.length > 0 && 
                                danhsachnguoichoi.map((item, index) => {
                                    if (item.total > personWin.point) {
                                        setPersonWin({
                                            key: index,
                                            point: item.total,
                                        })
                                    }
                                    return (
                                        <View style={styles.itemDiem} key={index}>
                                            <Text style={styles.itemName}>{ item.name }</Text>
                                            <Text style={styles.itemPoint}>{ item.total }</Text>
                                            <View style={[styles.circle, { backgroundColor: item.color }]}>
                                                <Text style={[styles.itemPosition]}>{item.ketqua}</Text>
                                            </View>
                                            

                                        </View>                                        
                                    )
                                })

                            }
                        </View>
                        <View style={[styles.button]}>
                            <Pressable
                                style={[ styles.buttonItem]}
                                onPress={() => {
                                    setIsKetqua(false);
                                    ketThuc();
                                    setTongsovan(0)
                                    setDanhsachnguoichoi([])
                                    navigation.navigate('Gametienlen');
                                }}
                                >
                                <Text style={styles.textStyle}>Trang chủ thôi!</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>

    </>
  )
}

export default Danhsachdiem

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    item: {
      flex: 1,
      alignItems: 'center',
    },
    input: {
        height: 40,
        padding: 10,
        width: '100%',
        textAlign: 'center',
    },
    centeredView: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modal: {
        flex: 1,
        justifyContent: 'center',
      },
      modalView: {
        display: 'flex',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: 350,
      },
      button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    
      buttonItem: {
        backgroundColor: '#2196F3',
        height: 50,
        width: 130,
        borderRadius: 20,
        justifyContent: 'center',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        fontSize: 20,
      },
      inputAdd: {
        width: '70%',
        borderWidth: 1,
        padding: 7,
        marginLeft: 25,
        fontSize: 16,
        borderRadius: 10,
        textAlign: 'center'

      },

      warning: {
        color: 'red',
        // position: 'absolute',
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 16,
      },

      end: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      endModalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: 150,
        // backgroundColor: 'red',
        alignItems: 'center',
        alignContent: 'center'
      },
      endModal: {
        flex: 1,
        justifyContent: 'center',
        
      },
      ketquaModalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        height: 260,
        // backgroundColor: 'red',
        alignItems: 'center',
        alignContent: 'center'
      },
      itemDiem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      itemName: {
        fontSize: 20
      },
      itemPoint: {
        fontSize: 16
      },
      textName: {
        width: 70,
        fontSize: 20
      },
      itemNhapdiem: {
        flexDirection: 'row', alignItems: 'center', flex: 1
      },
      itemPosition: {
        color: 'white'
      },
      circle: {
        borderRadius: 30,
        width: 50,
        height: 50,
        // backgroundColor: '#0970cd',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
      },
    
  });