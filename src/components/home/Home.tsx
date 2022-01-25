import { NavLink } from 'react-router-dom';
import './home.sass';

export const Home = () => {
  return (
    <main className="main">
      <div className="wrapper main__wrapper">
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>

        <div className="main__content">
          <p className="main__text">Помогите бабушке нарядить елку</p>
        </div>

        <NavLink to='/shop-toys'>
          <button className="main__button">Начать</button>
        </NavLink>
      </div>
    </main>
  );
};
