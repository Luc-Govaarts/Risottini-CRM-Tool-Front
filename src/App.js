import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddLead from './Pages/AddLead'
import AddContact from './Pages/AddContact'
import LeadDetails from './Pages/LeadDetails'
import NavDrawer from "./Components/NavDrawer"
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/actions";
import SnackBar from './Components/NavDrawer/SnackBar';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <NavDrawer/>
      <SnackBar/>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>     
        <Route path="/contacts/add" component={AddContact}/>
        <Route path="/leads/add" component={AddLead}/>
        <Route path="/leads/:id" component={LeadDetails}/>
        <Route path="/" component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
