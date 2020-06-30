import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import MessageBox from "./Components/MessageBox";
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);
  
  return (
    <div className="App">
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/login" component={Signup}/>
        <Route path="/signup" component={Login}/>
        <Route exact path="/" component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
