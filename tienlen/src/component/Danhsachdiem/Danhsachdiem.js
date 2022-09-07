/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMain } from '../../context/Main.context';

function Danhsachdiem() {
    const { arrPoint, editPoint, setpoint, vanTieptheo, isShowEnd, setShowEnd, isShowAddPoint, setIsShowAddPoint, isKetqua, setIsKetqua, navigation } = useMain();

    const huy = () => {
        setIsShowAddPoint(!isShowAddPoint);
    }

    const addDiem = () => {
        setIsShowAddPoint(!isShowAddPoint);
        vanTieptheo();
    }
  return (
    <>
        <ScrollView>
            <View style={styles.container}>
                {arrPoint.map((item, i) => {
                    return (
                        <View style={styles.item} key={i}>
                            {item.arr.map((point, j) => {
                                return (
                                    <TextInput key={j}
                                    style={[styles.input, { backgroundColor: j % 2 === 0 ? '#3d7989' : '#7ea1aa' }]}
                                    onChangeText={(e) => editPoint(item.id, j, e)}
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
                            <TextInput
                                keyboardType="numeric"
                                style={styles.inputAdd}
                                onChangeText={(e) => setpoint(e, 1)}
                            />
                            <TextInput
                                keyboardType="numeric"
                                style={styles.inputAdd}
                                onChangeText={(e) => setpoint(e, 2)}
                            />
                            <TextInput
                                keyboardType="numeric"
                                style={styles.inputAdd}
                                onChangeText={(e) => setpoint(e, 3)}
                            />
                            <TextInput
                                keyboardType="numeric"
                                style={styles.inputAdd}
                                onChangeText={(e) => setpoint(e, 4)}
                            />
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
                                style={[ styles.buttonItem, { marginHorizontal: 20 }]}
                                onPress={() => {
                                    setShowEnd(!isShowEnd)
                                    setIsKetqua(true);
                                }}
                                >
                                <Text style={styles.textStyle}>Ok luôn</Text>
                            </Pressable>

                            <Pressable
                                style={[ styles.buttonItem, { marginHorizontal: 20 }]}
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
                        <Text style={styles.modalText}>Chúc mừng Bác Thọ bò!</Text>
                        <View style={[styles.button]}>
                            <Pressable
                                style={[ styles.buttonItem]}
                                onPress={() => {
                                    setIsKetqua(false);
                                    navigation.navigate('Home');
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
        flex: 1,
      },
      inputAdd: {
        borderBottomWidth: 1,
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
        height: 200,
        // backgroundColor: 'red',
        alignItems: 'center',
        alignContent: 'center'
      }
    
  });