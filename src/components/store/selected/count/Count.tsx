import Nouislider from "nouislider-react";
import {useEffect, useState} from "react";
import "nouislider/distribute/nouislider.css";
import './count.sass';
import { SelectAndDateType } from "../../../../utils/abstraction";

export const Count = (props: SelectAndDateType<number[]>) => {
  const toggleToy = props.func;
  const resetState = props.resetState;
  const [range, setRange] = useState(props.dateStart);

  const selectedCount = (data: string[]) => {
    setRange([Number(data[0]), Number(data[1])]);
    toggleToy('count', [Number(data[0]), Number(data[1])]);
  }

  useEffect(() => {
    if (resetState != null) {
      setRange([1, 12]);
    }
  }, [resetState]);

  return (
    <div className="count">
      <h4 className="count__title">Количество экземпляров:</h4>
      <div className="count__row">
        <div className="count__info">{range[0]}</div>
        <Nouislider className="count__input" onChange={(data) => selectedCount(data)} range={{min: 1, max: 12}}
                    start={[range[0], range[1]]} step={1} connect/>
        <div className="count__info">{range[1]}</div>
      </div>
    </div>
  )
};
