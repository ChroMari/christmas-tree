import {useState, useEffect} from "react";

import './selectsort.sass';

export  const SelectSort = (props: { func: (type: string, activeType: string[] | boolean) => void }) => {
  const [selectState, setSelectState] = useState('AZ');
  const toggleToy = props.func;

  useEffect(() => {
    const data = localStorage.getItem("chromari-setting");
    if (data) {
      const typeSort = JSON.parse(data);
      setSelectState(typeSort.sort[0]);
    }
  }, []);

  return (
    <div>
      <h4 className="count__title">Сортировка:</h4>
      <select className="select" value={selectState} onChange={(event) => {
        setSelectState(event.target.value);
        toggleToy('sort', [event.target.value]);
      }}>
        <option value="AZ">по названию от А до Я</option>
        <option value="ZA">по названию от Я до А</option>
        <option value="yearAZ">по году возрастание</option>
        <option value="yearZA">по году убывание</option>
      </select>
    </div>
  )
};
