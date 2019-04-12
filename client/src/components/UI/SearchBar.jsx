import { Divider, Icon, InputBase, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
import { NavigationStyles } from './ThemeProperties';


const SearchBar = props => {

  const { classes, tooltip, value, onSearchTermChange } = props;

  return (
    <Paper className={classes.searchRoot} elevation={1}>
      <div style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
        <Tooltip title={tooltip}>
          <Icon>help_outline</Icon>
        </Tooltip>
      </div>
      <Divider className={classes.divider}/>
      <InputBase
        className={classes.inputRoot}
        placeholder="Search…"
        type="search"
        value={value}
        onChange={event => onSearchTermChange(event.target.value)}
      />
      <SearchIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }}/>
    </Paper>
  );
};

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func
};

export default withStyles(NavigationStyles, { withTheme: true })(SearchBar);


