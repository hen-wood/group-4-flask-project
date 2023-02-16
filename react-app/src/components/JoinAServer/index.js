import React from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux';

import { thunkAddMembership } from '../../store/memberships';

import { thunkGetUserServers } from '../../store/servers';
import { useModal } from "../../context/Modal";
import './joinAServer.css'

export default function JoinAServer () {

    const dispatch = useDispatch();
    const [code, setCode] = useState("")
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();





     dispatch(thunkAddMembership(code))
    dispatch(thunkGetUserServers())
    closeModal();

    }

    return (
        <div className="joinServerContainer">


          <form  onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Enter Code'
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />

          <input type='submit' value='Join a Server'></input>

          </form>



      </div>

    )

}
