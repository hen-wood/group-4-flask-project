import React from 'react';
import { useModal } from '../../context/Modal';
import './OpenModalMenuItem.css'

function OpenModalMenuItem({
  modalComponent, // component to render inside the modal
  itemText, // text of the menu item that opens the modal
  onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onItemClick) onItemClick();
  };



  return (
    <button className='OpenModalMenuItemButton' onClick={onClick}>{itemText} <i class="fa-light fa-plus  fa-xl"></i></button>
  );
}

export default OpenModalMenuItem;
