import { Button, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '../../screens/Statistics';
import { Container } from '../UI/ThemeProperties';
import { sendMessage } from '../../actions';

const ChartContainer = props => {

  const { classes, history, dispatch, statsData } = props;

  return (
    <Grid item xs={12} sm={6} id={statsData}>
      <Paper className={classes.paper}>
        <h3>{statsData}</h3>
      </Paper>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent
        elementum facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in
      </Typography>
    </Grid>
  );
};

ChartContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    errorMessage: state.messages.error,
    successMessage: state.messages.success,
    messageConfirmed: state.messages.confirmed
  };
}

export default connect(mapStateToProps, {})(withStyles(Container)(ChartContainer));
