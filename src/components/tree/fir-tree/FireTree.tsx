import "./fireTree.sass"

import src1 from '../../../assets/tree/1.png';
import scr2 from '../../../assets/tree/2.png';
import src3 from '../../../assets/tree/3.png';
import src4 from '../../../assets/tree/4.png';
import src5 from '../../../assets/tree/5.png';
import src6 from '../../../assets/tree/6.png';

export const FireTree = (props: { toggleTree: (idTree: string, idArea: number) => void, activeTree: string }) => {
  const toggleTree = props.toggleTree;
  const activeTree = props.activeTree;
  const cards = [{
      item: 1,
      src: src1,
    },
    {
      item: 2,
      src: scr2,
    },
    {
      item: 3,
      src: src3,
    },
    {
      item: 4,
      src: src4,
    },
    {
      item: 5,
      src: src5,
    },
    {
      item: 6,
      src: src6,
    }];

  return (
    <div className="">
      <h4 className="tree__title">Выберите ёлку</h4>
      <div className="tree__container">
        {
          cards.map((card, index) => {
            return (
              <div key={card.item} className={(activeTree === card.src) ? "tree__card tree__card_active" : 'tree__card'}
                   onClick={() => toggleTree(card.src, index)}>
                <img className="tree__card-img " src={card.src} alt="fir-tree"/>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
