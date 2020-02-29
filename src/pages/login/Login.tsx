import React, { useState } from "react";
import logo from "./../../assets/sw_logo.png";
import { validateUserAndLogin } from '../../api/login';
import { useHistory } from "react-router-dom";
import { setItem } from '../../utils/service';
import "./_login.scss";
import Loader from "../../components/shared/loader";

function Login() {
  const history = useHistory();

  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setLoader] = useState(false);

  const loginRequest = (event: any) => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('please enter valid details!');
    }
    if (username && password) {
      setErrorMessage('');
      validateUser(username, password);
    }
  };

  const validateUser = (username: string, password: string) => {
    setLoader(true);
    validateUserAndLogin(username, password).then(results => {
      let users = [];
      if (results.count > 0) {
        users = results.results;
        users.forEach((user: any) => {
          if (user.name === username && user.birth_year === password) {
            setItem('user', true);
            setLoader(false);
            history.push('/');
          }
          else {
            alert('user not found');
            setLoader(false);
          }
        })
      }
    });
  }

  return (
    <div className="sw-login">
      <div className="sw-login__logo">
        <img src={logo} alt="star wars logo" onClick={() => {
          onChangeUsername('Luke Skywalker');
          onChangePassword('19BBY');
        }} />
      </div>
      <div className="sw-login__form">
        <form onSubmit={loginRequest} noValidate>
          {isLoading && <Loader />}
          <div className="sw-error--msg">{errorMessage}</div>
          <input
            placeholder="username"
            type="text"
            className="sw-input--primary sw-input--md"
            value={username}
            onChange={(event) => {
              onChangeUsername(event?.target.value);
              setErrorMessage('');
            }} />
          <input
            placeholder="password"
            type="password"
            className="sw-input--primary sw-input--md"
            value={password}
            onChange={(event) => {
              onChangePassword(event?.target.value);
              setErrorMessage('');
            }} />
          <button disabled={isLoading} type="submit" className="sw-button--primary sw-button--md">LOGIN</button>
        </form>
      </div>
    </div>
  );
}

export default Login;