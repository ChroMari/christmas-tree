import {Itoy} from "../../utils/abstraction";
import {FireTree} from "./fir-tree/FireTree";
import {useEffect, useMemo, useRef, useState} from "react";

import src1 from '../../assets/bg/1.jpg';
import src1Tree from '../../assets/tree/1.png';

import './treePage.sass';
import {BackgroundGame} from "./backgroundGame/BackgroundGame";
import {toysData} from "../../database/toysData";
import {data} from "../../database/data";
import {snowSvg, volumeSvg} from "./svg";

import React from "react";

const elementGarland = (size: number, start: number, count: number, step: number, middle: number, name: string) => {
  const liArr = [];

  for (let i = 0; i < count; i++) {
    const newStart = start + step * i;
    liArr.push(<li className={name}
                   style={{transform: `rotate(${newStart}deg) translate(${middle}px) rotate(-${newStart}deg)`}}></li>)
  }
  return (
    <ul className="garland" style={{width: `${size}px`, height: `${size}px`}}>
      {liArr}
    </ul>
  )
}

const imgDragDrop = (e: any, treeRef: any, imgToyRef: any, indx: number, countImg: Array<number>, setCountImg: any, listRef: any) => {
  let shiftX = 0;
  let shiftY = 0;
  let flag = false;
  const startleft = imgToyRef.current.style.left;

  const moveAt = (pageX: number, pageY: number) => {
    imgToyRef.current.style.left = pageX - shiftX + 'px';
    imgToyRef.current.style.top = pageY - shiftY + 'px';
  }

  const hendlerEnt = () => flag = true;
  const hendlerLeave = () => flag = false;
  const onMouseMove = (e: any) => moveAt(e.pageX, e.pageY);

  const mouseDownHandler = (e: any) => {
    shiftX = e.clientX - imgToyRef.current.getBoundingClientRect().left;
    shiftY = e.clientY - (imgToyRef.current.getBoundingClientRect().top - 80);

    listRef.forEach((item: any) => item.current.style.pointerEvents = 'none');

    treeRef.current.addEventListener('mouseenter', hendlerEnt);
    treeRef.current.addEventListener('mouseleave', hendlerLeave);

    imgToyRef.current.style.zIndex = 1000;
    imgToyRef.current.style.position = 'absolute';
    imgToyRef.current.style.pointerEvents = 'none';

    moveAt(e.pageX, e.pageY);

    document.addEventListener('mousemove', onMouseMove);

    const hendlerUp = () => {
      treeRef.current.removeEventListener('mouseenter', hendlerEnt);
      treeRef.current.removeEventListener('mouseenter', hendlerEnt);
      imgToyRef.current.onmouseup = null;
      document.removeEventListener('mousemove', onMouseMove);
      imgToyRef.current.style.pointerEvents = 'auto';
      listRef.forEach((item: any) => item.current.style.pointerEvents = 'auto');

      let finishleft = imgToyRef.current.style.left;

      if (!flag) {
        imgToyRef.current.style.left = 'auto';
        imgToyRef.current.style.top = 'auto';

        finishleft = 'auto';
        imgToyRef.current.style.zIndex = 1;
      }

      if (startleft[startleft.length - 1] === 'o' && finishleft[finishleft.length - 1] === 'x') {
        const arr = countImg[indx] - 1;
        setCountImg([...countImg.slice(0, indx), arr, ...countImg.slice(indx + 1, countImg.length)]);
      } else if (startleft[startleft.length - 1] === 'x' && finishleft[finishleft.length - 1] === 'o') {
        const arr = countImg[indx] + 1;
        setCountImg([...countImg.slice(0, indx), arr, ...countImg.slice(indx + 1, countImg.length)]);
      }
      document.removeEventListener('mouseup', hendlerUp);
    }

    document.addEventListener('mouseup', hendlerUp);
  }

  mouseDownHandler(e);
}


export const TreePage = (props: { toys: Itoy[], audio: HTMLAudioElement }) => {
  let ind = 0;
  const toys = props.toys;
  const audio = props.audio;
  const defToys: Itoy[] = [];
  const areaArrTree = [
    <area shape="poly"
          coords="378, 701, 378, 701, 438, 682, 472, 653, 481, 597, 495, 575, 498, 547, 498, 529, 456, 521, 434, 487, 465, 480, 468, 454, 441, 426, 419, 406, 413, 388, 435, 376, 441, 351, 441, 351, 427, 336, 398, 335, 393, 314, 400, 301, 406, 283, 402, 260, 413, 241, 407, 214, 381, 201, 358, 185, 358, 165, 358, 165, 370, 159, 357, 124, 334, 127, 322, 123, 313, 105, 304, 99, 318, 84, 310, 60, 281, 29, 270, 12, 257, 2, 232, 1, 228, 18, 224, 34, 199, 40, 199, 40, 194, 62, 183, 86, 179, 105, 154, 127, 144, 142, 157, 169, 152, 203, 128, 198, 104, 198, 93, 232, 112, 256, 110, 283, 122, 298, 107, 320, 98, 335, 67, 333, 61, 371, 93, 394, 100, 415, 71, 423, 34, 419, 8, 432, 8, 458, 24, 481, 32, 480, 36, 502, 36, 502, 59, 509, 71, 516, 59, 530, 34, 530, 12, 528, 3, 534, 0, 569, 0, 581, 19, 593, 33, 626, 53, 635, 76, 663, 89, 666, 112, 693, 155, 696, 176, 705, 191, 712, 223, 712, 279, 711, 321, 709, 380, 703"/>,
    <area shape="poly"
          coords="395, 705, 395, 705, 383, 671, 416, 670, 440, 693, 487, 653, 492, 610, 497, 578, 484, 521, 456, 446, 433, 405, 408, 345, 384, 272, 365, 214, 319, 117, 320, 103, 292, 55, 269, 29, 257, 2, 237, 2, 205, 53, 158, 157, 110, 286, 90, 308, 80, 354, 70, 379, 71, 417, 47, 459, 24, 500, 22, 528, 10, 575, 10, 613, -1, 635, 11, 650, 109, 672, 97, 696, 123, 713, 157, 711, 236, 680, 265, 701, 315, 698, 344, 710, 394, 705"/>,
    <area shape="poly"
          coords="360, 691, 360, 691, 403, 679, 455, 676, 487, 660, 485, 619, 495, 610, 496, 564, 469, 514, 470, 480, 447, 432, 435, 394, 395, 306, 383, 265, 379, 238, 349, 186, 342, 150, 323, 100, 302, 69, 300, 49, 262, 26, 251, 3, 236, 2, 219, 10, 207, 47, 183, 103, 147, 184, 121, 264, 93, 356, 58, 441, 36, 504, 36, 548, 15, 577, 4, 616, 26, 655, 77, 694, 134, 697, 141, 711, 167, 711, 278, 703, 309, 711, 336, 710, 359, 691"/>,
    <area shape="poly"
          coords="312, 699, 347, 706, 379, 694, 415, 710, 453, 708, 442, 670, 434, 658, 458, 652, 471, 639, 467, 626, 481, 625, 496, 627, 482, 596, 467, 584, 467, 584, 443, 549, 421, 537, 449, 534, 463, 528, 442, 514, 426, 491, 403, 478, 425, 472, 457, 473, 434, 444, 423, 434, 420, 421, 428, 404, 409, 382, 388, 364, 361, 351, 407, 361, 405, 340, 396, 318, 387, 296, 365, 280, 372, 259, 364, 247, 378, 230, 352, 216, 340, 195, 334, 161, 318, 132, 299, 99, 299, 99, 287, 60, 275, 42, 255, 23, 249, 8, 243, 6, 238, 15, 242, 35, 242, 35, 226, 25, 217, 43, 189, 88, 167, 141, 147, 153, 144, 177, 130, 203, 136, 216, 140, 248, 106, 279, 85, 315, 85, 328, 75, 358, 77, 378, 60, 407, 69, 419, 69, 419, 100, 404, 85, 425, 45, 468, 27, 485, 27, 485, 38, 497, 77, 496, 45, 525, 26, 559, 0, 592, 8, 609, 8, 609, 5, 624, 1, 634, 1, 647, 11, 642, 5, 661, 5, 669, 23, 671, 37, 663, 62, 657, 56, 678, 80, 673, 73, 708, 90, 712, 102, 705, 122, 709, 144, 679, 167, 690, 208, 694, 243, 699, 251, 712, 278, 712, 278, 712, 278, 704"/>,
    <area shape="poly"
          coords="290, 701, 341, 697, 385, 682, 385, 682, 431, 681, 485, 632, 464, 580, 448, 529, 415, 473, 393, 459, 420, 422, 373, 381, 390, 348, 364, 310, 349, 275, 334, 240, 340, 223, 321, 177, 290, 107, 271, 57, 261, 15, 248, 7, 241, 21, 227, 50, 191, 126, 155, 228, 119, 333, 120, 384, 96, 399, 78, 424, 82, 453, 61, 469, 74, 492, 40, 519, 37, 548, 21, 581, 18, 603, 2, 626, 18, 642, 18, 642, 46, 646, 45, 674, 80, 705, 80, 705, 148, 703, 178, 687, 211, 699, 260, 700"/>,
    <area shape="poly"
          coords="307, 706, 354, 689, 415, 667, 415, 667, 451, 656, 483, 649, 485, 622, 496, 584, 480, 545, 458, 480, 457, 447, 429, 428, 436, 398, 452, 381, 437, 363, 406, 327, 393, 268, 365, 186, 337, 124, 306, 86, 297, 53, 291, 31, 270, 12, 258, 0, 246, 18, 244, 47, 227, 35, 196, 90, 166, 142, 147, 141, 145, 175, 106, 240, 92, 295, 62, 353, 48, 370, 66, 386, 66, 412, 38, 434, 50, 457, 38, 487, 16, 521, 21, 546, 20, 571, 29, 595, 2, 616, 10, 633, 54, 649, 66, 678, 111, 690, 179, 706, 235, 706, 279, 712"/>,
  ]

  const settingGameReset = {
    treeGame: src1Tree,
    treeGameBg: src1,
    snowGame: false,
    audioGame: false,
    treeGameArea: 1,
  };

  const [settingGame, setSettingGame] = useState(() => {
    const saved = localStorage.getItem("chromari-setting-game");
    if (saved) return JSON.parse(saved);
    return settingGameReset;
  });

  const [showToys, setToys] = useState<Itoy[]>([]);

  for (let i = 0; i < 20; i++) defToys.push(data[i]);

  const [treeGameGarland, setTreeGameGarland] = useState('green');
  const [check, setCheck] = useState(false);

  const toggleTreeGame = (srcTree: string, idArea: number) => {
    setSettingGame({...settingGame, treeGame: srcTree, treeGameArea: idArea});
  }

  const toggleBgGame = (srcBg: string) => {
    setSettingGame({...settingGame, treeGameBg: srcBg});
  }

  const localReset = () => {
    setSettingGame({...settingGameReset});
  }

  const playAudio = () => {
    audio.play();
    document.removeEventListener('click', playAudio);
  }

  useEffect(() => {
    if (settingGame.audioGame && audio.paused) document.addEventListener('click', playAudio);
  }, []);

  useEffect(() => {
    if (settingGame.audioGame && audio.paused) {
      audio.play();
    } else if (!settingGame.audioGame) {
      audio.pause();
    }
  }, [settingGame.audioGame]);

  const [countImg, setCountImg] = useState([1]);

  useEffect(() => {
    setCountImg([]);
    if (toys.length === 0) {
      setToys(defToys);
      defToys.forEach(toy => setCountImg(coun => [...coun, Number(toy.count)]));
    } else {
      setToys(toys);
      toys.forEach(toy => setCountImg(coun => [...coun, Number(toy.count)]));
    }
  }, [toys]);

  useEffect(() => localStorage.setItem('chromari-setting-game', JSON.stringify(settingGame)), [settingGame]);

  const treeRef = useRef(null);

  const listRef = useMemo(() => showToys.map((toy) => {
    const arr = [];
    for (let i = 0; i < Number(toy.count); i++) {
      arr.push(React.createRef<HTMLImageElement>());
    }
    return arr;
  }).flat(), [showToys]);


  const ShowImgToy = (count: number, src: string) => {
    const arrRefImgs = [];

    for (let i = 0; i < count; i++) {
      arrRefImgs.push(ind);
      ind++;
    }

    return arrRefImgs;
  }

  return (
    <main className="main store">
      <div className="store_bg">
        <div className="wrapper tree__wrapper">
          <div className="tree__menu">
            <div className="tree__setting">
              <button onClick={() => {
                setSettingGame({...settingGame, audioGame: !settingGame.audioGame});
              }}
                      className={settingGame.audioGame ? 'tree__setting-song tree__setting-song_active' : "tree__setting-song"}>{volumeSvg}</button>
              <button onClick={() => setSettingGame({...settingGame, snowGame: !settingGame.snowGame})}
                      className={settingGame.snowGame ? "tree__setting-snow tree__setting-snow_active" : "tree__setting-snow"}>{snowSvg}</button>
            </div>
            <div className="tree__setting-row">
              <FireTree toggleTree={toggleTreeGame} activeTree={settingGame.treeGame}/>
              <BackgroundGame toggleTreeBg={toggleBgGame} activeBg={settingGame.treeGameBg}/>
            </div>

            <div>
              <h4 className="tree__title">Гирлянда</h4>
              <div className="garland__wrapper">
                <div>
                  <button
                    onClick={() => {
                      setTreeGameGarland('multicolor');
                      setCheck(true);
                    }}
                    className={(treeGameGarland === 'multicolor') ? "color-btn color-btn_active multicolor-btn" : "color-btn multicolor-btn"}></button>
                  <button
                    onClick={() => {
                      setTreeGameGarland('red');
                      setCheck(true);
                    }}
                    className={(treeGameGarland === 'red') ? "color-btn color-btn_active red-btn" : 'color-btn red-btn'}></button>
                  <button
                    onClick={() => {
                      setTreeGameGarland('blue');
                      setCheck(true);
                    }}
                    className={(treeGameGarland === 'blue') ? "color-btn color-btn_active blue-btn" : "color-btn blue-btn"}></button>
                  <button
                    onClick={() => {
                      setTreeGameGarland('yellow');
                      setCheck(true);
                    }}
                    className={(treeGameGarland === 'yellow') ? "color-btn color-btn_active yellow-btn" : 'color-btn yellow-btn'}></button>
                  <button
                    onClick={() => {
                      setTreeGameGarland('green');
                      setCheck(true);
                    }}
                    className={(treeGameGarland === 'green') ? "color-btn color-btn_active green-btn" : 'color-btn green-btn'}></button>
                </div>
                <label className="switch">
                  <input type="checkbox" checked={check}/>
                  <span className="slider round" onClick={() => setCheck(!check)}></span>
                </label>
              </div>
            </div>

            <button className="store__filters-button" onClick={localReset}>reset localstorage</button>

          </div>

          <div className="game_bg" style={{backgroundImage: `url(${settingGame.treeGameBg})`}}>

            <div
              className={check ? 'game__garland-container game__garland-container_active' : 'game__garland-container'}>
              {elementGarland(120, 65, 5, 12, 60, treeGameGarland)}
              {elementGarland(170, 60, 7, 10, 85, treeGameGarland)}
              {elementGarland(230, 60, 8, 8, 115, treeGameGarland)}
              {elementGarland(300, 60, 11, 6, 150, treeGameGarland)}
              {elementGarland(380, 55, 18, 4, 190, treeGameGarland)}
              {elementGarland(465, 55, 21, 3.5, 232.5, treeGameGarland)}
              {elementGarland(555, 58, 24, 3, 277.5, treeGameGarland)}
              {elementGarland(650, 58, 29, 2.5, 325, treeGameGarland)}
            </div>

            <map name="tree-map" ref={treeRef}>
              {areaArrTree[settingGame.treeGameArea]}
            </map>


            <img useMap="#tree-map" draggable={false} className="game__img-tree" src={settingGame.treeGame} alt=""/>


            <div id="wrapper" className={settingGame.snowGame ? 'game__snow game__snow_active' : "game__snow"}>
            </div>
          </div>

          <div className="tree__favorite-wrapper">
            <div className="tree__toys">
              <h4 className="tree__title">Игрушки</h4>

              <div className="tree__toys-wrapper">
                {
                  showToys.map((toy, indx) => {
                    if (indx === 0) ind = 0;
                    return (
                      <div className="tree__card-toy">
                        <span className="tree__card-count">{countImg[indx]}</span>
                        {
                          ShowImgToy(Number(toy.count), toysData[Number(toy.num) - 1]).map(item => {
                            return (
                              <img ref={listRef[item]}
                                   style={{left: 'auto', top: 'auto'}}
                                   onDragStart={() => false}
                                   onMouseDown={(e) => imgDragDrop(e, treeRef, listRef[item], indx, countImg, setCountImg, listRef)}
                                   src={toysData[Number(toy.num) - 1]} alt="toy"/>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }

              </div>


            </div>
          </div>
        </div>
      </div>
    </main>
  )
};
