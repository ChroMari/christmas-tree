import {useEffect, useState} from 'react';
import {SelectAndDateType} from '../../../../utils/abstraction';

import './color.sass';

export const Color = (props: SelectAndDateType<string[]>) => {
  const typeColors = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
  const toggleToy = props.func;
  const resetState = props.resetState;
  const [colorArr, setColor] = useState<string[]>(props.dateStart);

  const selectedColor = (type: string) => {
    if (colorArr.indexOf(type) === -1) {
      setColor([...colorArr, type]);
      toggleToy('color', [...colorArr, type]);
    } else {
      const newColorArr = colorArr.filter((color) => color !== type);
      setColor(newColorArr);
      toggleToy('color', newColorArr);
    }
  };

  useEffect(() => {
    if (resetState != null) {
      setColor([]);
    }
  }, [resetState]);

  return (
    <div className="color">
      <h4 className="color__title">цвет:</h4>
      {
        typeColors.map((typeColor) => (
          <button key={typeColor}
                  className={(colorArr.indexOf(typeColor) !== -1) ? 'color__button color__button_active' : 'color__button'}
                  onClick={() => selectedColor(typeColor)}></button>
        ))
      }
    </div>
  );
};
