import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {thunkGetUserServers} from "../../store/servers";
import './ServersList.css'
export default function ServersList() {
    const dispatch = useDispatch();
    let servers = []
    const serversObj = useSelector(state => {
        return state.servers
    })

    if(serversObj){
      servers = Object.values(serversObj);
    }


    useEffect(() => {
        dispatch(thunkGetUserServers())

    }, [dispatch, servers.length])


    if (!servers) {

        return <div>no servers</div>
    }

    return servers && (
        <div className='serverListContainer'>

            {servers.map((server) => (
               server ?(
                <div>
                   <NavLink className="serverListButton" key={server.id} to={`/channels/${server.id}/${server.id}`}
                   style={{ color: '#3b9758' }}
                    activeStyle={{ color: 'white' }}
                    >
                        {server.name}

                    </NavLink>
                    </div>
                    ) : (<div>nothin</div>)
                ))}
        </div>
    )
}
