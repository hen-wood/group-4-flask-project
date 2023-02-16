import React from 'react';

import { leaveServerThunk } from '../../store/memberships';
import { useHistory } from 'react-router-dom';
import { thunkGetUserServers } from '../../store/servers';
import { useDispatch, useSelector } from "react-redux";
import {deleteServerFromList} from '../../store/servers'

export default function LeaveAServer () {
    const history = useHistory();
    const dispatch = useDispatch();
  	const server = useSelector(
      state => state.server
    );
      console.log(server, 'in server leave here')


    const handleSubmit = async (e) => {
        e.preventDefault();
      let serverId = server.id
        dispatch(leaveServerThunk(server.id))
        dispatch(deleteServerFromList(serverId))
        history.push('/channels/@me')
    }

    return (
        <div>



<form  onSubmit={handleSubmit}>

          <input type='submit' value='Leave server'></input>

          </form>





      </div>

    )

}
