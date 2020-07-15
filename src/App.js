import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddLeadMUI from './Pages/AddLeadMUI'
import LeadDetails from './Pages/LeadDetails'
import NavDrawer from "./Components/NavDrawer"
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/actions";
import AddContact from "./Pages/AddContact";
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
        <Route path="/leads/add" component={AddLeadMUI}/>
        <Route path="/leads/:id" component={LeadDetails}/>
        <Route path="/contacts/add" components={AddContact}/>
        <Route path="/" component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
