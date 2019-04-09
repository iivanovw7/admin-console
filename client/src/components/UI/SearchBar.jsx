import { InputBase, withStyles, Paper, IconButton, Divider, Icon } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { NavigationStyles } from './ThemeProperties';
import Tooltip from '@material-ui/core/Tooltip';

const SearchBar = props => {

  const { classes, tooltip } = props;

  return (
    <Paper className={classes.searchRoot} elevation={1}>
      <div style={{color: 'rgba(0, 0, 0, 0.54)'}}>
        <Tooltip title={tooltip}>
          <Icon>help_outline</Icon>
        </Tooltip>
      </div>
      <Divider className={classes.divider} />
      <InputBase className={classes.inputRoot} placeholder="Search…" />
      <IconButton className={classes.searchIcon} aria-label="Search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func
};

export default withStyles(NavigationStyles, { withTheme: true })(SearchBar);

