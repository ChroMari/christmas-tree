import {NavLink} from 'react-router-dom';
import './header.sass';

type HeaderProps = {
  countFavorite: number,
}

export const Header = ({countFavorite}: HeaderProps) => {

  return (
    <header className="header">
      <div className="wrapper header__wrapper">

        <NavLink
          to='/'
          className='header-link'>
          <p className='link-content'>Главная</p>
        </NavLink>
        <NavLink
          to='/shop-toys'
          className='header-link'>
          <p className='link-content'>Игрушки</p>
        </NavLink>
        <NavLink
          to='/tree'
          className='header-link'>
          <p className='link-content'>Ёлка</p>
        </NavLink>

        <div className="header__count-toys">
          <span>{countFavorite}</span>
        </div>
      </div>
    </header>
  )
};
