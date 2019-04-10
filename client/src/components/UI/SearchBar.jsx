import { InputBase, Paper, Divider, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { NavigationStyles } from './ThemeProperties';
import Tooltip from '@material-ui/core/Tooltip';


const SearchBar = props => {

  const { classes, tooltip, value, onSearchTermChange } = props;

  return (
    <Paper className={classes.searchRoot} elevation={1}>
      <div style={{color: 'rgba(0, 0, 0, 0.54)'}}>
        <Tooltip title={tooltip}>
          <Icon>help_outline</Icon>
        </Tooltip>
      </div>
      <Divider className={classes.divider} />
      <InputBase
        className={classes.inputRoot}
        placeholder="Search…"
        type="search"
        value={value}
        onChange={event => onSearchTermChange(event.target.value)}
      />
      <SearchIcon style={{color: 'rgba(0, 0, 0, 0.54)'}}/>
    </Paper>
  );
};

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleDrawerToggle: PropTypes.func
};

export default withStyles(NavigationStyles, { withTheme: true })(SearchBar);


