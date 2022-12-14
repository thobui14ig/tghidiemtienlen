/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMain } from '../../../../context/Main.context';

const objectDefault = [
   {  id: 1, name: '' },
   {  id: 2, name: '' },
   {  id: 3, name: '' },
   {  id: 4, name: '' },
];

function Home({ navigation }) {
    const { loadHome } = useMain();
    const [modalVisible, setModalVisible] = useState(false);
    const [isWarning, setIsWarning] = useState('none');
    const [danhsachnguoichoi, setDanhsachnguoichoi] = useState([...objectDefault]);
    const [danhsachvan, setDanhsachvan] = useState([]);

    const themNhanvat = () => {
        const condition = (item) => item.name === '';
        if (danhsachnguoichoi.every(condition)) {
          setIsWarning('flex');
        } else {
          setModalVisible(!modalVisible);
          AsyncStorage.setItem('@danhsachnguoichoi', JSON.stringify(danhsachnguoichoi));
          navigation.navigate('Container');
        }
    };

    useEffect(() => {
      const getData = async () => {
          let data = await AsyncStorage.getItem('@listGames');
          data = JSON.parse(data);
          if (!data) {
            data = [];
          }
          setDanhsachvan(data.reverse());
      };

      getData();
    }, [loadHome]);




    const huy = () => {
        setModalVisible(!modalVisible);
        setIsWarning('none');
        setDanhsachnguoichoi({ ...objectDefault });
    };

    const handleThemnguoichoi = (key, value) => {
      setIsWarning('none');
      danhsachnguoichoi[key].name = value;
      setDanhsachnguoichoi([...danhsachnguoichoi]);
    };

    const lichsu = (value) => {
      navigation.navigate('Lichsu', {
        id: value,
      });
    }


  return (
    <>
        <View style={styles.container}>
            <View style={styles.header}>
                <View><Text style={styles.headerText}>S??? sinh t???</Text></View>
                <View>
                    <Text style={styles.add}  onPress={() => setModalVisible(true)}>+</Text>
                </View>
            </View>

            <View style={styles.body}>
                <ScrollView>
                  {danhsachvan.length > 0 && 
                    danhsachvan.map((item, index) => {
                      let ngaytao = dayjs(item.ngaytao).format('DD/MM/YYYY HH:mm:ss')
                      const { data } = item;
                      // eslint-disable-next-line no-shadow
                      let danhsachnguoichoi = '';
                     data.map((item1, i) => {
                        let text = ', ';
                        if (i + 1 === data.length) {
                          text = '';
                        }
                        danhsachnguoichoi = danhsachnguoichoi + item1.name + text;
                     });

                      return (
                        <TouchableOpacity key={index}
                          onPress={() => lichsu(item.id)}
                        >
                          <View style={styles.bodyItem} >
                              <View style={styles.circle}>
                                  <Text style={styles.circleText}>Xong</Text>
                              </View>
                              <View style={styles.bodyContent}>
                                  <View>
                                      <Text style={styles.bodyContentText}>{ danhsachnguoichoi }</Text>
                                  </View>
                                  <View>
                                      <Text style={styles.bodyContentNgaytao}>{ngaytao}</Text>
                                  </View>
                              </View>
                          </View>
                        </TouchableOpacity>

                      )
                    })
                  }
                </ScrollView>
            </View>
        </View>
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Nh???p t??n!</Text>
                        <View style={{ flex: 10 }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => handleThemnguoichoi(0, e)}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => handleThemnguoichoi(1, e)}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => handleThemnguoichoi(2, e)}
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(e) => handleThemnguoichoi(3, e)}
                            />
                        </View>
                        <Text style={[styles.warning, { display: isWarning }] }>Ch??a nh???p ????? t??n b?? gi??!</Text>
                        <View style={styles.button}>
                            <Pressable
                                style={[ styles.buttonItem]}
                                onPress={() => themNhanvat()}
                                >
                                <Text style={styles.textStyle}>Ok lu??n</Text>
                            </Pressable>

                            <Pressable
                                style={[ styles.buttonItem]}
                                onPress={() => huy()}
                                >
                                <Text style={styles.textStyle}>H???y</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>

        </View>

    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    flex: 1,
    backgroundColor: '#0970cd',
  },

  header: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
    height: 30,
  },

  body: {
    flex: 10,
    paddingHorizontal: 1,
  },

  headerText: {
    fontSize: 20,
    lineHeight: 80,
    color: 'white',
  },
  add: {
    fontSize: 40,
    paddingRight: 10,
    lineHeight: 70,
    color: 'white',
  },
  bodyItem: {
    backgroundColor: '#21486b',
    borderRadius: 5,
    marginVertical: 5,
    height: 80,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
    // he
  },
  circle: {
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0970cd',
  },
  circleText: {
    textAlign: 'center',
    color: 'white',
  },
  bodyContent: {
    flex: 1,
    borderLeftWidth: 1,
    marginLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '60%',
    paddingHorizontal: 10,
    alignItems: 'center',
    color: 'white',
    borderLeftColor: 'white',
  },
  bodyContentText: {
    color: 'white',
    fontSize: 16,
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
    flex: 2,
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
  input: {
    borderBottomWidth: 1,
  },
  warning: {
    color: 'red',
    // position: 'absolute',
    paddingBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  bodyContentNgaytao: {
    color: 'white',
    fontSize: 12,
  },
});
