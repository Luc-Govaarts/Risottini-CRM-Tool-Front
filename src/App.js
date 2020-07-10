import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddLead from './Pages/AddLead'
import LeadDetails from './Pages/LeadDetails'
import NavDrawer from "./Components/NavDrawer"
import { selectToken } from "./store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getUserWithStoredToken } from "./store/user/actions";
import AddContactForm from "./Components/AddContactForm";
import SnackBar from './Components/NavDrawer/SnackBar';

function App() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken)
  const history = useHistory();

  if(!token) {
    history.push("/login")
  }

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
        <Route path="/add" component={AddLead}/>
        <Route path="/leads/:id" component={LeadDetails}/>
        <Route path="/contacts/add" components={AddContactForm}/>
        <Route exact path="/" component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
