import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddLead from './Pages/AddLead'
import LeadDetails from './Pages/LeadDetails'
import Navigation from "./Components/Navigation";
import Loading from "./Components/Loading";
import MessageBox from "./Components/MessageBox";

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
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/lead/add" component={AddLead}/>
        <Route path="/lead/:id" component={LeadDetails}/>
        <Route exact path="/" component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
