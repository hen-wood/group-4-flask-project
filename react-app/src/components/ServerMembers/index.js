
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
export default function ServerMembers() {
    const dispatch = useDispatch();
    let server = []
    let members = []
    const serverObj = useSelector(state => {
        return state.server
    })

    if(serverObj){
      server = Object.values(serverObj);
      console.log(serverObj, '00000')
     members = Object.values(serverObj)
     console.log(members[5], '11111111111111')
    }

    useEffect(() => {
    }, [dispatch, members.length])

    console.log(server, '22222222222222222222')

    if (!server) {

        return <div>no server memberss</div>
    }

    return server[5] ? (
        <div>

            {server[5].map((member) => (
               member ?(
                <div>

                    {member.username}
                    </div>
                    ) : (<div>no members</div>)
                ))}
        </div>
    ) : (<div>loading members</div>)
}
