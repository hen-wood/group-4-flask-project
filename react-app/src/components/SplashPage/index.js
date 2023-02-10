import OpenModalButton from "../OpenModalButton"
import LoginFormModal from "../LoginFormModal"
import {Link} from 'react-router-dom'
import React, { useState, useRef } from "react";
export default function SplashPage(){
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };


    return (<div>

        <Link to='/login'>Login</Link>

        </div>
    )
}
