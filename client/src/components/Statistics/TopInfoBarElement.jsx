import { Avatar, Icon, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';

export const TopInfoBarElement = props => {

  const { classes, icon, view, title } = props;

  return (
    <ListItem className={classes.desktop}>
      <Avatar>
        <Icon>{icon}</Icon>
      </Avatar>
      <ListItemText primary={title} secondary={view}/>
    </ListItem>
  );
};



