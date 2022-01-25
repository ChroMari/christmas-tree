import {CardToy} from "./card/CardToy";
import {data} from '../../database/data';
import {useEffect, useState} from "react";
import {Itoy, ValueSettingType} from "../../utils/abstraction";
import {Shape} from "./selected/shape/Shape";
import {Color} from "./selected/color/Color";
import {Size} from "./selected/size/Size";
import {Favorite} from "./selected/favorite/Favorite";
import {Count} from "./selected/count/Count";
import {Year} from "./selected/year/Year";
import {SelectSort} from "./selected/selectSort/SelectSort"

import './storePage.sass';
import React from "react";

import {createBrowserHistory} from 'history';

type SettingType = {
  shape: string[];
  color: string[];
  size: string[];
  favorite: boolean;
  count: number[];
  year: number[];
  sort: string[];
}

type StorePageType = {
  func: (idToy: Itoy) => boolean;
}

export const StorePage = (props: StorePageType) => {
  const {func} = props;
  const resetSetting = {
    shape: [],
    color: [],
    size: [],
    favorite: false,
    count: [1, 12],
    year: [1940, 2020],
    sort: ['AZ'],
  };
  const [toys, setToys] = useState(data);
  const [copyToy, setCopyToy] = useState<Itoy[]>(toys);
  const [reset, setReset] = useState<boolean | null>(null);
  const [setting, setSetting] = useState<SettingType>(() => {
    const saved = localStorage.getItem("chromari-setting");
    if (saved) return JSON.parse(saved);
    return resetSetting;
  });
  const [inputText, setInputText] = useState('');

  const selectToy = (type: string, activeType: ValueSettingType, update?: string) => {
    const setlocal = localStorage.getItem("chromari-setting");
    let settingToy: SettingType = {...setting, [type]: activeType};
    if (setlocal) {
      const data = JSON.parse(setlocal);
      setSetting({...data, [type]: activeType});
      settingToy = {...data, [type]: activeType};
    }

    let newToys: Itoy[] = [];
    if (update === 'reset') {
      settingToy = {...resetSetting, sort: setting.sort};
    } else if (update === 'local') {
      settingToy = {...resetSetting, sort: ['AZ']};
    }

    localStorage.setItem("chromari-setting", JSON.stringify(settingToy));

    if (settingToy.shape.length === 0) {
      newToys = data;
    } else {
      settingToy.shape.forEach((item) => {
        data.filter((toy) => {
          if (toy.shape === item) newToys.push(toy);
        });
      });
    }

    if (settingToy.color.length !== 0) {
      let newColorToys: Itoy[] = [];
      settingToy.color.forEach((item) => {
        newToys.filter((toy) => {
          if (toy.color === item) newColorToys.push(toy);
        });
      });
      newToys = newColorToys;
    }

    if (settingToy.size.length !== 0) {
      let newSizeToys: Itoy[] = [];
      settingToy.size.forEach((item) => {
        newToys.filter((toy) => {
          if (toy.size === item) newSizeToys.push(toy);
        });
      });
      newToys = newSizeToys;
    }

    if (settingToy.favorite) {
      let newFavoriteToys: Itoy[] = [];
      newToys.forEach((toy) => {
        if (toy.favorite === settingToy.favorite) newFavoriteToys.push(toy);
      });
      newToys = newFavoriteToys;
    }

    if (settingToy.count) {
      let newFavoriteToys: Itoy[] = [];
      newFavoriteToys = newToys.filter((toy) => Number(toy.count) >= settingToy.count[0] && Number(toy.count) <= settingToy.count[1]);
      newToys = newFavoriteToys;
    }

    if (settingToy.year) {
      let newFavoriteToys: Itoy[] = [];
      newFavoriteToys = newToys.filter((toy) => Number(toy.year) >= settingToy.year[0] && Number(toy.year) <= settingToy.year[1]);
      newToys = newFavoriteToys;
    }

    if (settingToy.sort) {
      if (settingToy.sort[0] === 'AZ') {
        let newFavoriteToys: Itoy[] = [];
        newFavoriteToys = newToys.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name[0] < b.name[0]) return -1;
          return 0;
        });
        newToys = newFavoriteToys;
      } else if (settingToy.sort[0] === 'ZA') {
        let newFavoriteToys: Itoy[] = [];
        newFavoriteToys = newToys.sort((a, b) => {
          if (a.name > b.name) return 1;
          else if (a.name[0] < b.name[0]) return -1;
          return 0;
        }).reverse();
        newToys = newFavoriteToys;
      } else if (settingToy.sort[0] === 'yearAZ') {
        let newFavoriteToys: Itoy[] = [];
        newFavoriteToys = newToys.sort((a, b) => Number(a.year) - Number(b.year));
        newToys = newFavoriteToys;
      } else if (settingToy.sort[0] === 'yearZA') {
        let newFavoriteToys: Itoy[] = [];
        newFavoriteToys = newToys.sort((a, b) => Number(b.year) - Number(a.year));
        newToys = newFavoriteToys;
      }
    }

    if (inputText.length !== 0) {
      let newFavoriteToys: Itoy[] = [];
      newFavoriteToys = newToys.filter(toy => {
        const name = toy.name.toLocaleLowerCase();
        if (name.indexOf(inputText.toLowerCase()) !== -1) return toy;
      });
      newToys = newFavoriteToys;
    }

    setToys(newToys);
    setCopyToy(newToys);
  }

  const searchToy = (value: string) => {
    if (value.length !== 0) {
      const newToys = copyToy.filter(toy => {
        const name = toy.name.toLocaleLowerCase();
        if (name.indexOf(value.toLowerCase()) !== -1) return toy;
      });
      setToys(newToys);
    } else {
      setToys(copyToy);
    }
  }

  const handlerReset = () => {
    setReset(!reset);
    setInputText('');
    selectToy('sort', setting.sort, 'reset');
  };

  const localReset = () => {
    setReset(!reset);
    selectToy('sort', setting.sort, 'local');
  }

  useEffect(() => {
    selectToy('shape', setting.shape)
  }, []);

  const history = createBrowserHistory();

  return (
    <main className="main store">
      <div className="store_bg">
        <div className="wrapper">
          <div className="store__row">
            <div className="store__filters">
              <h3 className="store__filters-title">фильтры по значению</h3>
              <Shape func={selectToy} resetState={reset} dateStart={setting.shape}/>
              <Color func={selectToy} resetState={reset} dateStart={setting.color}/>
              <Size func={selectToy} resetState={reset} dateStart={setting.size}/>
              <Favorite func={selectToy} resetState={reset} dateStart={setting.favorite}/>
            </div>

            <div className="store__filters">
              <h3 className="store__filters-title">фильтры по диапазону</h3>
              <div>
                <Count func={selectToy} resetState={reset} dateStart={setting.count}/>
                <Year func={selectToy} resetState={reset} dateStart={setting.year}/>
              </div>
            </div>

            <div className="store__filters">
              <SelectSort func={selectToy}/>

              <div className="header__search-input">
                <input className="header__search"
                       onChange={(event) => {
                         setInputText(event.target.value);
                         searchToy(event.target.value);
                       }} autoFocus={true}
                       value={inputText}
                       placeholder="Поиск" type="text"/>
                {inputText && <button className="header__search-button" onClick={() => {
                  setInputText('');
                  searchToy('');
                }}>x</button>}
              </div>
              <div className="store__buttons">
                <button className="store__filters-button" onClick={() => handlerReset()}>RESET</button>
                <button className="store__filters-button" onClick={() => {
                  localReset();
                  localStorage.setItem("chromari-favoriteToys", JSON.stringify([]));
                  history.go(0);
                }}>reset localstorage
                </button>
              </div>

            </div>
          </div>

          <div className="store__wrapper">
            {
              (toys.length) ? (toys.map((toy) => <CardToy key={toy.num} content={toy} toggleToy={func}/>))
                : (<div className="store__card_no">Извините, совпадений не обнаружено</div>)
            }
          </div>
        </div>
      </div>
    </main>
  );
};
