import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Itoy} from './utils/abstraction';

import {Home} from './components/home/Home';
import {StorePage} from './components/store/StorePage';
import {TreePage} from './components/tree/TreePage';
import {Modal} from './components/modal/Modal';

import './app.sass';
import { Header } from './components/header/Header';

// @ts-ignore
import url from './assets/audio/audio.mp3';

const App = () => {
  const [favoriteToys, setFavoriteToys] = useState<Itoy[]>([]);
  const [activeModal, setAtiveModal] = useState(false);

  const toggleFavoriteToy = (idToy: Itoy): boolean => {
    const index = favoriteToys.find((toy) => toy.num === idToy.num);

    if (index) {
      if (favoriteToys.length === 20) {
        setAtiveModal(true);
        return false;
      }
      const newToys = favoriteToys.filter((toy) => toy.num !== idToy.num)
      setFavoriteToys(newToys);
      localStorage.setItem("chromari-favoriteToys", JSON.stringify(newToys));
      return false;
    } else {
      setFavoriteToys([...favoriteToys, idToy]);
      localStorage.setItem("chromari-favoriteToys", JSON.stringify([...favoriteToys, idToy]));
      return true;
    }
  };

  useEffect(() => {
    const date = localStorage.getItem("chromari-favoriteToys");
    if (date) setFavoriteToys(JSON.parse(date));
  }, []);

  const closeModal = () => {
    setAtiveModal(false);
  }

  const [audio, setAudio] = useState(new Audio(url));

  return (
    <div className="app">
      {activeModal && <Modal closeModal={closeModal}/>}
      <BrowserRouter>
        <Header countFavorite={favoriteToys.length}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop-toys' element={<StorePage func={toggleFavoriteToy}/>}/>
          <Route path='/tree' element={<TreePage toys={favoriteToys} audio={audio}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
