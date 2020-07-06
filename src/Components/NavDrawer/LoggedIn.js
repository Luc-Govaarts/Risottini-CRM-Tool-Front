import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import { Avatar, Button, Typography, Box } from '@material-ui/core'
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  return (
    <>
      <Avatar><PersonOutlineRoundedIcon /></Avatar>
      <Typography>
        <Box textAlign="center" m={3}>
        {user.name}
        </Box>
      </Typography>
      <Box textAlign="center" m={2}>
        <Button variant="contained" onClick={() => dispatch(logOut())}>Logout</Button>
      </Box>
    </>
  );
}
