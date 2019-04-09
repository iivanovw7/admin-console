import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getSingleGroup } from '../actions/groups';
import GroupContainer from '../components/Group/GroupContainer';
import { Wrapper } from '../components/UI/ThemeProperties';

const Group = props => {
  const { classes, history, dispatch } = props;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit group</h2>
        </div>
      </Paper>
      <p style={{ color: 'red' }}>{props.errorMessage && !props.messageConfirmed}</p>
      <GroupContainer history={history} dispatch={dispatch}/>
    </main>
  );
};

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    groups: state.groups,
    errorMessage: state.groups.error,
    successMessage: state.groups.success,
    messageConfirmed: state.groups.confirmed
  };
}

export default connect(mapStateToProps, { getSingleGroup })(withStyles(Wrapper, { withTheme: true })(withRouter(Group)));