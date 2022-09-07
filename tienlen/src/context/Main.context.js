/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
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
        const data = setZero();
        setDiem(data);
        setEmoji([...point]);
    };

    return (
    <MainContext.Provider value={{arrPoint, setpoint, editPoint, vanTieptheo, ok, isShowAddPoint, setIsShowAddPoint, emoji, isShowEnd, setShowEnd, isKetqua, setIsKetqua, navigation}}>
        {children}
    </MainContext.Provider>
    );
};

export default MainProvider;

export const useMain = () => {
  return useContext(MainContext);
};
