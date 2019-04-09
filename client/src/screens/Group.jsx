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
  const { classes, history } = props;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit group</h2>
        </div>
      </Paper>
      <p style={{color: 'red'}}>{props.errorMessage}</p>
      <GroupContainer history={history}/>
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
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
  };
}

export default connect(mapStateToProps, { getSingleGroup })(withStyles(Wrapper, { withTheme: true })(withRouter(Group)));