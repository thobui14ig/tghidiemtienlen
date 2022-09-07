/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';

export const MainContext = React.createContext({});
const pointDefault = [
    { id: 1, point: 0 },
    { id: 2, point: 0 },
    { id: 3, point: 0 },
    { id: 4, point: 0 },
];


const setZero = () => {
    return pointDefault.map((item) => {
        return { ...item, point: 0 };
    });
}

const setZeroArrPoint = () => {
    return pointDefault.map((item) => {
        return { ...item, arr: [] };
    });
}

const MainProvider = ({children , navigation}) => {
    const [ok, setok] = useState(true);
    const [emoji, setEmoji] = useState([]);
    const [isShowAddPoint, setIsShowAddPoint] = useState(false);
    const [arrPoint, setArrPoint] = useState([
        { id: 1, arr: [] },
        { id: 2, arr: [] },
        { id: 3, arr: [] },
        { id: 4, arr: [] },
    ]);

    const [point, setDiem] = useState([...pointDefault]);
    const [isShowEnd, setShowEnd] = useState(false);
    const [isKetqua, setIsKetqua] = useState(false);
    const [loadHome, setLoadHome] = useState(false);
    const setpoint = (itemPoint, stt) => {
        const row = [...point].find((item) => item.id === stt);
        row.point = itemPoint === '' ? 0 : itemPoint;
        setDiem([...point]);
    };

    const editPoint = (id, v, pointEdit) => {// id thứ mấy và ván thứ bao nhiêu
        const row = arrPoint.find((item) => item.id === id);
        row.arr[v] = pointEdit;
        setArrPoint([...arrPoint]);
    };

    const vanTieptheo = () => {
        const total = point.reduce((value, item) => {
            return value + item.point;
        }, 0);
        if (!total) {
            return;
        }
        const newArrPoint = arrPoint.map((item, i) => {
            const arr = item.arr.concat(point[i].point);
            return {...item, arr};
        });
        setArrPoint([...newArrPoint]);
        setok(!ok);
        const data = setZero(); //sset điểm từng ván về 0
        setDiem(data);
        setEmoji([...point]);
    };

    const ketThuc = async () => {
        await AsyncStorage.setItem('@listGames', JSON.stringify([]))
        let danhsachnguoichoi = await AsyncStorage.getItem('@danhsachnguoichoi');
        danhsachnguoichoi = JSON.parse(danhsachnguoichoi);

        const listDanhsachVan = arrPoint.map((item, index) => {
            item.name = danhsachnguoichoi[index].name;
            return item;
        });

        let tatcavangame = await AsyncStorage.getItem('@listGames');
        if (!tatcavangame) {
            tatcavangame = [];
        } else {
            tatcavangame = JSON.parse(tatcavangame);
        }
        let item = { id: Date.now() + Math.floor(Math.random() * 101), ngaytao: new Date(), data: listDanhsachVan };
        tatcavangame.push(item)
        AsyncStorage.setItem('@listGames', JSON.stringify(tatcavangame));
        const data = setZeroArrPoint(); //set danh sach mảng điểm về 0
        setArrPoint(data);
        setLoadHome(!loadHome);
    }

    return (
    <MainContext.Provider value={{arrPoint, setpoint, editPoint, vanTieptheo, ok, isShowAddPoint, setIsShowAddPoint, emoji, isShowEnd, setShowEnd, isKetqua, setIsKetqua, navigation, ketThuc, loadHome, setLoadHome}}>
        {children}
    </MainContext.Provider>
    );
};

export default MainProvider;

export const useMain = () => {
  return useContext(MainContext);
};
