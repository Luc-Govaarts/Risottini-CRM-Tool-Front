import React from 'react';
import { useHistory } from 'react-router-dom'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function LeadMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoreInfo = () => {
    history.push(`/leads/${props.leadId}`)
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleMoreInfo}>Meer info</MenuItem>
        <MenuItem onClick={handleClose}>Sluiten</MenuItem>
      </Menu>
    </div>
  );
}