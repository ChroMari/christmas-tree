import './backgroundGame.sass';

import src1 from '../../../assets/bg/1.jpg';
import src2 from '../../../assets/bg/2.jpg';
import src3 from '../../../assets/bg/3.jpg';
import src4 from '../../../assets/bg/4.jpg';
import src5 from '../../../assets/bg/5.jpg';
import src6 from '../../../assets/bg/6.jpg';
import src7 from '../../../assets/bg/7.jpg';
import src8 from '../../../assets/bg/8.jpg';
import src9 from '../../../assets/bg/9.jpg';
import src10 from '../../../assets/bg/10.jpg';


export const BackgroundGame = (props: {toggleTreeBg: (idBg: string) => void, activeBg: string}) => {
  const toggleTreeBg = props.toggleTreeBg;
  const activeBg = props.activeBg;
  const imgs = [src1, src2, src3, src4, src5, src6, src7, src8, src9, src10];

  return (
    <div>
      <h4 className="tree__title">Выберите фон</h4>
      <div className="tree__container tree__container_bg">
        {
          imgs.map(img => {
            return (
              <img onClick={() => toggleTreeBg(img)}
                   className={(activeBg === img) ? "tree__bg-card tree__bg-card_active" : 'tree__bg-card'}
                   src={img} alt="img bg"/>
            )
          })
        }
      </div>
    </div>
  )
};
