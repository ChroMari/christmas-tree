import {useState, useEffect} from 'react';
import { toysData } from '../../../database/toysData';

import {Itoy, CardToyType} from '../../../utils/abstraction';

import './cardToy.sass';

export const CardToy = (props: CardToyType) => {
  const {num, name, count, year, shape, color, size, favorite} = props.content;
  const toggleToy = props.toggleToy;
  const [activeTag, setActiveTag] = useState(true);

  useEffect(() => {
    const date = localStorage.getItem('chromari-favoriteToys');
    if (date) {
      const localToys = JSON.parse(date);
      const index = localToys.find((toy: Itoy) => toy.num === num);
      if (index) setActiveTag(false);
    }
  }, []);

  return (
    <div className="card-toy" onClick={() => {
      setActiveTag(!activeTag);
      !toggleToy(props.content) && setActiveTag(true);
    }}>
      <h4 className="card-toy__title">{name}</h4>
      <div className="card-toy__row">
        <img className="card-toy__img" src={toysData[Number(num) - 1]} alt="toy"/>
        <span className={"card-toy__tag " + ((activeTag) ? '' : 'card-toy__tag_active')}></span>

        <div className="card-toy__content">
          <p className="card-toy__text">Количество:
            <span className="card-toy__date">{count}</span>
          </p>
          <p className="card-toy__text">Год покупки:
            <span className="card-toy__date">{year}</span>
          </p>
          <p className="card-toy__text">Форма:
            <span className="card-toy__date">{shape}</span>
          </p>
          <p className="card-toy__text">Цвет:
            <span className="card-toy__date">{color}</span>
          </p>
          <p className="card-toy__text">Размер:
            <span className="card-toy__date">{size}</span>
          </p>
          <p className="card-toy__text">Любимая:
            <span className="card-toy__date">{(favorite) ? 'Да' : 'Нет'}</span>
          </p>
        </div>

      </div>
    </div>
  )
}
