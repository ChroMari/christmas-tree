import React from 'react';
import './modal.sass';

type ModalProps = {
  closeModal: () => void,
}

export const Modal = ({closeModal}: ModalProps) => {
  return (
    <React.Fragment>
      <div className="modal">
        <div className="modal__title">Извините, все слоты заполнены</div>
        <div className="modal__text">Удалите какую-нибудь игрушку, чтобы добавить другую в избранное</div>
        <button className="store__filters-button modal__button" onClick={closeModal}>Хорошо</button>
      </div>
      <div className="overlay"></div>
    </React.Fragment>
  )
};
