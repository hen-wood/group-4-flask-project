import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function LogoutModal(props) {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.session.user)

    const { closeModal } = useModal();

    const handleLogout = () => {
        dispatch(sessionActions.logout()).then(() => {
            window.location.href = '/'
            props.callbackClose();
            closeModal();
        })
    };

    return (
        <div className="create-channel-container">
            <div className="logout-modal-style">
                <div className="logout-q-style">
                    Are you sure to log out?
                </div>
                <div>
                    <button className="btn btn-no" onClick={() => closeModal()}>No</button>
                    <button className="btn btn-yes" onClick={handleLogout}>Yes</button>
                </div>
            </div>
        </div >
    );
}

export default LogoutModal;
