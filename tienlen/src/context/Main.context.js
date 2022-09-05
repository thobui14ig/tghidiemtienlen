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

const MainProvider = ({children}) => {
    const [ok, setok] = useState(true);
    const [emoji, setEmoji] = useState([]);

    const [isShowAddPoint, setIsShowAddPoint] = useState(false);

    const [arrPoint, setArrPoint] = useState([
        { id: 1, arr: [] },
        { id: 2, arr: [] },
        { id: 3, arr: [] },
        { id: 4, arr: [] },
    ]);

    const [point, setPoint] = useState([...pointDefault]);

    const setpoint = (itemPoint, stt) => {
        const row = [...point].find((item) => item.id === stt);
        row.point = itemPoint === '' ? 0 : itemPoint;
        setPoint([...point]);
    };

    const editPoint = (id, v, pointEdit) => {// id thứ mấy và ván thứ bao nhiêu
        const row = arrPoint.find((item) => item.id === id);
        row.arr[v] = pointEdit;
        setArrPoint([...arrPoint]);
    };

    const vanTieptheo = () => {
        // const check = point.every((item) => item.point === 0)

        // if (check) {return alert('Chưa nhập điểm mà, thằng ngu này!');}
        const newArrPoint = arrPoint.map((item, i) => {
            const arr = item.arr.concat(point[i].point);
            return {...item, arr};
        });
        setArrPoint([...newArrPoint]);
        setok(!ok);
        setPoint([...pointDefault]);
        setEmoji([...point]);
    };

    return (
    <MainContext.Provider value={{arrPoint, setpoint, editPoint, vanTieptheo, ok, isShowAddPoint, setIsShowAddPoint, emoji}}>
        {children}
    </MainContext.Provider>
    );
};

export default MainProvider;

export const useMain = () => {
  return useContext(MainContext);
};
