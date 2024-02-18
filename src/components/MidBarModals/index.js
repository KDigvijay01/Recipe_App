import React, {useState, useEffect} from 'react';
import Modal from "@mui/material/Modal";


const MidBarModals = (props) => {
  
  return (
   
    <Modal
    id="MidBarModals"
    className="midBarModalsClass"
    open={props.component ? true : false}   
    onClose={props.close ? props.close : undefined}
    hideBackdrop={props.hideBackdrop ?? false}
    >
        {props.children}   
    </Modal>
  )
}

export default MidBarModals;