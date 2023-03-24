import React from "react";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {createServerThunk} from "../../store/servers";
import "./createServer.css";
import {useModal} from "../../context/Modal";
export default function CreateServer() {

    const dispatch = useDispatch();
    const [serverName, setServerName] = useState();
    const [category, setCategory] = useState('Gaming');
    const {closeModal} = useModal();
    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            name: serverName,
            category
        };

        dispatch(createServerThunk(payload));
        setServerName("");
        closeModal();

    };

    return (
        <div className="createServerContainer">
			<div className="CreateServerHeader">Tell us more about your server</div>
			<div className="CreateServerDescription">In order to help you with your setup, select one of the options below after creating your server name</div>
            <form className="createForm"
                onSubmit={handleSubmit}>
                <div className="serverNameContainer">

                    <input type="text" placeholder="Type Server Name Here" required
                        value={serverName}
                        onChange={
                            e => setServerName(e.target.value)
                        }/>
                </div>
                <div className="categoryContainer"
                    onChange={
                        e => setCategory(e.target.value)
                }>
                    <label htmlFor="Gaming">
                        <div className="radioCategoryContainer">
							<div></div>
						<i class="fa-solid fa-gamepad fa-2xl"></i>

                            <input type="radio" id="Gaming" value="Gaming" name="category"/>
                            Gaming
							<div></div>
                        </div>
                    </label>
                    <label htmlFor="Entertainment">
                        <div className="radioCategoryContainer">
						<div></div>
						<i class="fa-solid fa-tv fa-2xl"></i>
                            <input type="radio"  id="Entertainment" value="Entertainment" name="category"/>
                            Entertainment
							<div></div>
                        </div>
                    </label>
                    <label htmlFor="Artists & Creators">
                        <div className="radioCategoryContainer">
						<div></div>
						<i class="fa-solid fa-palette fa-2xl"></i>

                            <input type="radio" id="Artists & Creators" value="Artists & Creators" name="category"/>
                            Artists & Creators
							<div></div>
                        </div>
                    </label>
                    <label htmlFor="Education">
                        <div className="radioCategoryContainer">
						<div></div>
						<i class="fa-solid fa-school fa-2xl"></i>
                            <input type="radio" id="Education" value="Education" name="category"/>
                            Education
							<div></div>
                        </div>
                    </label>
					<label htmlFor="Science & Tech">
                    <div className="radioCategoryContainer">
					<div></div>
					<i class="fa-solid fa-microchip fa-2xl"></i>

                        <input type="radio" id="Science & Tech" value="Science & Tech" name="category"/>
                        Science & Tech
						<div></div>
                    </div>
					</label>
					<label htmlFor="Other">
                    <div className="radioCategoryContainer">
					<div></div>
					<i class="fa-solid fa-tv fa-2xl"></i>
                        <input type="radio" id="Other" value="Other" name="category"/>
                        Other
                    </div>
					<div></div>
					</label>
				<div className="createServerSubmitContainer">

                <input className="createServerSubmitButton" type="submit" value="Create Server"></input>
                </div>
				</div>
            </form>
        </div>
    );
}
