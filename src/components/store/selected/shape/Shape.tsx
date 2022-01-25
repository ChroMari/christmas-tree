import {useEffect, useState} from 'react';
import {SelectAndDateType, selectToyType} from '../../../../utils/abstraction';

import {ball, bell, cone, snowflake, toyFigure} from './svg';

import './shape.sass';


export const Shape = (props: SelectAndDateType<string[]>) => {
  const typeShapes = [{
    name: 'шар',
    svg: ball,
  }, {
    name: 'колокольчик',
    svg: bell,
  }, {
    name: 'шишка',
    svg: cone,
  }, {
    name: 'снежинка',
    svg: snowflake,
  }, {
    name: 'фигурка',
    svg: toyFigure,
  }];

  const toggleToy = props.func;
  const [shapeArr, setShape] = useState<string[]>(props.dateStart);
  const resetState = props.resetState;


  useEffect(() => {
    if (resetState != null) {
      setShape([]);
    }
  }, [resetState]);

  const selectedForm = (type: string) => {
    if (shapeArr.indexOf(type) === -1) {
      setShape([...shapeArr, type]);
      toggleToy('shape', [...shapeArr, type]);
    } else {
      const newShapeArr = shapeArr.filter((shape) => shape !== type);
      setShape(newShapeArr);
      toggleToy('shape', newShapeArr);
    }
  };

  return (
    <div className="shape">
      <h4 className="shape__title">форма:</h4>
      {
        typeShapes.map((typeShape) => (
          <div key={typeShape.name} onClick={() => selectedForm(typeShape.name)}
               className={(shapeArr.indexOf(typeShape.name) !== -1) ? 'shape__svg shape__svg_active' : 'shape__svg'}>
            {typeShape.svg}
          </div>
        ))
      }
    </div>
  );
};