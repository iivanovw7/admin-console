import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { NavLink } from 'react-router-dom';

export const DrawerNavigationItem = (props) => {

  const { classes, link, text, icon } = props;

  return (
    <ListItem
      button
      component={NavLink}
      to={link}
      key={text}
      activeClassName={classes.active}
      disableTouchRipple = { true }
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={text}/>
    </ListItem>
  );

};








