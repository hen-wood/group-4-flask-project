import React from 'react';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';
import { createServerThunk } from '../../store/servers';
import { useHistory } from 'react-router-dom';
import './createServer.css'


export default function CreateServer () {
    const history = useHistory();
    const dispatch = useDispatch();
    const [serverName, setServerName] = useState();



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('start',
        serverName)


        const payload = {
            name: serverName,
        }

        dispatch(createServerThunk(payload))
        setServerName('')
    }

    return (
        <div>


          <form className='createForm' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Server Name'
            required
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
            />

          <input type='submit' value='Create Server'></input>

          </form>



      </div>

    )

}
