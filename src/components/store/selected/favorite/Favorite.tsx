import {useEffect, useState} from 'react';
import {SelectAndDateType} from '../../../../utils/abstraction';

import './favorite.sass';

export const Favorite = (props: SelectAndDateType<boolean>) => {
  const toggleToy = props.func;
  const resetState = props.resetState;
  const [activeFavorite, setActive] = useState(props.dateStart);

  const selectedFavorite = () => {
    setActive(!activeFavorite);
    toggleToy('favorite', !activeFavorite);
  }

  useEffect(() => {
    if (resetState != null) {
      setActive(false);
    }
  }, [resetState]);

  return (
    <div className="favorite">
      <h4 className="favorite__title">только любимые:</h4>
      <button className={(activeFavorite) ? 'favorite__button favorite__button_active' : 'favorite__button'}
              onClick={selectedFavorite}></button>
    </div>
  )
};
