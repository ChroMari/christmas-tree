import {ball} from "../shape/svg";
import {useEffect, useState} from "react";
import {SelectAndDateType} from "../../../../utils/abstraction";

import './size.sass';

export const Size = (props: SelectAndDateType<string[]>) => {
  const typeSizes = ['большой', 'средний', 'малый'];
  const toggleToy = props.func;
  const resetState = props.resetState;
  const [sizeArr, setSize] = useState<string[]>(props.dateStart);

  const selectedSize = (type: string) => {
    if (sizeArr.indexOf(type) === -1) {
      setSize([...sizeArr, type]);
      toggleToy('size', [...sizeArr, type]);
    } else {
      const newSizeArr = sizeArr.filter((size) => size !== type);
      setSize(newSizeArr);
      toggleToy('size', newSizeArr);
    }
  };

  useEffect(() => {
    if (resetState != null) {
      setSize([]);
    }
  }, [resetState]);

  return (
    <div className="size">
      <h4 className="size__title">размер:</h4>
      {
        typeSizes.map((typeSize) => (
          <div key={typeSize} onClick={() => selectedSize(typeSize)}
               className={(sizeArr.indexOf(typeSize) !== -1) ? 'size__svg size__svg_active' : 'size__svg'}>
            {ball}
          </div>
        ))
      }
    </div>
  )
};
