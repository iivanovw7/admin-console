import { Avatar, Icon, List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Buttons } from '../UI/ThemeProperties';

export const TopInformationBar = props => {

  const { classes, viewBranch, viewMode, viewGroup } = props;

  return (
    <List style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className={classes.mobile} style={{ display: 'flex' }}>
        <h4>{viewMode}</h4>
      </div>
      <ListItem className={classes.desktop}>
        <Avatar>
          <Icon>view_module</Icon>
        </Avatar>
        <ListItemText primary="View Mode" secondary={viewMode}/>
      </ListItem>
      {viewGroup && (
        <ListItem className={classes.desktop}>
          <Avatar>
            <Icon>timeline</Icon>
          </Avatar>
          <ListItemText primary="Branch view" secondary={viewGroup}/>
        </ListItem>
      )}
      {viewGroup && (
        <ListItem className={classes.desktop}>
          <Avatar>
            <Icon>timeline</Icon>
          </Avatar>
          <ListItemText primary="Group view" secondary={viewBranch}/>
        </ListItem>
      )}
    </List>
  );
};

TopInformationBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Buttons, { withTheme: true })(TopInformationBar);