import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Wrapper } from './ThemeProperties';

const Spinner = props => {

  const { classes } = props;

  return (
    <div className={classes.spinnerBlock}>
      <CircularProgress className={classes.progress}/>
    </div>
  );
};

Spinner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Wrapper)(Spinner);
