import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import {useEffect, useState} from "react";
import { SelectAndDateType } from "../../../../utils/abstraction";

export const Year = (props: SelectAndDateType<number[]>) => {
  const toggleToy = props.func;
  const resetState = props.resetState;
  const [range, setRange] = useState(props.dateStart);

  const selectedYear = (data: string[]) => {
    setRange([Number(data[0]), Number(data[1])]);
    toggleToy('year', [Number(data[0]), Number(data[1])]);
  }

  useEffect(() => {
    if (resetState != null) {
      setRange([1940, 2020]);
    }
  }, [resetState]);

  return (
    <div className="year">
      <h4 className="count__title">Год приобретения:</h4>
      <div className="count__row">
        <div className="count__info">{range[0]}</div>
        <Nouislider className="count__input" onChange={(data) => selectedYear(data)} range={{min: 1940, max: 2020}}
                    start={[range[0], range[1]]} step={1} connect/>
        <div className="count__info">{range[1]}</div>
      </div>
    </div>
  )
};