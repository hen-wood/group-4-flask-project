import React from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkAddMembership } from '../../store/memberships';
import { useHistory } from 'react-router-dom';
import { thunkGetUserServers } from '../../store/servers';



export default function JoinAServer () {
    const history = useHistory();
    const dispatch = useDispatch();
    const [code, setCode] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();





     dispatch(thunkAddMembership(code))
    dispatch(thunkGetUserServers())

    }

    return (
        <div>


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
