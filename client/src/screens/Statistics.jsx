import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ChartContainer from '../components/Statistics/Chart/ChartContainer';
import TopInfoBar from '../components/Statistics/TopInfoBar';
import { Wrapper } from '../components/UI/ThemeProperties';

const Statistics = props => {
  const { classes, history, dispatch, viewMode, viewGroup, viewBranch } = props;

  //list of Chart containers to be rendered on this page
  const viewPorts = ['Users', 'Permissions', 'Tickets', 'Groups', 'Messages'];

  //Statistics TopBar contains information about view restrictions
  const renderInfoBar = () => (
    <TopInfoBar viewMode={viewMode} viewGroup={viewGroup} viewBranch={viewBranch}/>
  );

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <h2>Statistics</h2>
        {!viewMode ? <CircularProgress style={{ margin: 12 }} size={24}/> : renderInfoBar()}
      </Paper>
      <Grid style={{ marginTop: 24 }} container spacing={24}>
        {viewPorts.map(dataType => (
          <ChartContainer
            key={dataType}
            dataType={dataType}
            dispatch={dispatch}
            history={history}
          />
        ))}
      </Grid>
    </main>
  );
};

Statistics.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    viewMode: state.stats.viewMode,
    viewBranch: state.stats.viewBranch,
    viewGroup: state.stats.viewGroup
  };
}

export default connect(mapStateToProps)(withStyles(Wrapper, { withTheme: true })(withRouter(Statistics)));





