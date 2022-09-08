/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useMain } from '../../context/Main.context';
function Header() {
  const { isShowAddPoint, setIsShowAddPoint, isShowEnd, setShowEnd, tongsovan } = useMain();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bangdiemText}>Bảng điểm</Text>
      </View>
      <View style={styles.hanhdong}>
        <View style={styles.van}>
          <Text style={styles.vanText}>Ván: {tongsovan}</Text>
        </View>
        <View style={styles.circle}>
        <TouchableOpacity onPress={() => setShowEnd(!isShowEnd)}>
            <MaterialIcons name="check" size={35} color={'white'} />
        </TouchableOpacity>
        </View>
        <View style={styles.circle}>
          <TouchableOpacity onPress={() => setIsShowAddPoint(!isShowAddPoint)}>
            <MaterialIcons name="add" size={35} color={'white'}/>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#2196F3',
  },
  bangdiemText: {
    fontSize: 20,
    color: 'white'
  },
  hanhdong: {
    flexDirection: 'row'
  },
  circle: {
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0970cd',
    marginLeft: 10,
  },
  van: {
    width: 60,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    fontSize: 16
  },
  vanText: {
    fontSize: 16,
    color: 'white'
  }
});
