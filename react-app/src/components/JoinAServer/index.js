import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkAddMembership } from "../../store/memberships";
import { thunkGetUserServers } from "../../store/servers";
import { useModal } from "../../context/Modal";
import "./joinAServer.css";

export default function JoinAServer() {
	const dispatch = useDispatch();
	const [code, setCode] = useState("");
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([]);

	const handleSubmit = e => {
		e.preventDefault();
		setErrors([]);
		dispatch(thunkAddMembership(code)).then(res => {
			if (res.message) {
				setErrors(e => [res.message]);
			} else {
				dispatch(thunkGetUserServers()).then(() => closeModal());
			}
		});
	};

	return (
		<div className="joinServerContainer">
			<h1 className="joinAServerHeader">Join A Server</h1>
			<p className="joinAServerInformation">
				Enter an invite below to join an existing server
			</p>

            <form onSubmit={handleSubmit}>
                {
                errors.map(error => (
                    <div className='errors-actual'>
                        {error}</div>
                ))
            }
                <div className='joinAServerInviteLinkText'>
                    Invite Link
                    <p className='astrik'>*</p>
                </div>
                <input type="text" placeholder='Enter Code' required
                    value={code}
                    onChange={
                        (e) => setCode(e.target.value)
                    }/>
                <p className='joinAServerDescription'>
                    INVITES SHOULD LOOK LIKE
                    <br/>
                    <br/>
                    92ag4
                    <br/>
                    akuHS
                    <br/>
                    AHu45
                </p>
                <div className='joinAServerDontHaveAInvite'>
                    Don't have an invite?
                    <br/>
                    <i class="fa-solid fa-compass"></i>
                    In the future we will have some public communities for you to discover.
                </div>
                <div className='joinASeverSubmitButtonContainer'>
                    <input type='submit' className='joinAServerSubmitButton' value='Join Server'></input>
                </div>
            </form>


        </div>

    )

}
