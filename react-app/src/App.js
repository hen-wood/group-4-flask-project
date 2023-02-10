import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PeopleImageLeft from "./components/Svgs/peopleatabar";
import SplashPage from "./components/SplashPage";
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <SplashPage />
          </Route>
          <Route path="/login" >
            <LoginForm />
          </Route>
          <Route path="/register">
            <RegisterForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
