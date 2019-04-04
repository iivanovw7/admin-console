import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Wrapper } from '../components/UI/ThemeProperties';
import { getSingleGroup } from '../actions/groups';
import GroupContainer from '../components/Group/GroupContainer';

const Group = props => {
  const { classes, history } = props;
  const group = props.groups.group;

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.controlsContainer}>
        <div className={classes.selectorsContainer}>
          <h2>Create/Edit group</h2>
        </div>
      </Paper>
      {
        (group) ?
          (<GroupContainer history={history}/>) : (<p>Loading...</p>)
      }
    </main>
  );
};

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    groups: state.groups
  };
}

export default connect(mapStateToProps, { getSingleGroup })(withStyles(Wrapper, { withTheme: true })(withRouter(Group)));