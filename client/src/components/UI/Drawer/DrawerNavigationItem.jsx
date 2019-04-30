import { Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const DrawerNavigationItem = props => {

  const { classes, link, text, icon } = props;

  return (
    <ListItem
      button
      component={NavLink}
      to={link}
      key={text}
      activeClassName={classes.active}
      disableTouchRipple={true}
    >
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={text}/>
    </ListItem>
  );

};
