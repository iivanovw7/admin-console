import { CircularProgress, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TopInformationBar from '../components/Statistics/TopInformationBar';
import ChartContainer from '../components/Statistics/TopInformationBar';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';

const Statistics = props => {
  const { classes, history, dispatch, viewMode, viewGroup, viewBranch, stats } = props;
  const viewPorts = ['users', 'permissions', 'tickets', 'groups', 'messages'];

  const renderInfoBar = () => (
    <TopInformationBar viewMode={viewMode} viewGroup={viewGroup} viewBranch={viewBranch}/>
  );

  const renderViewPort = stats => (
    <Grid style={{ marginTop: '24px' }} container spacing={24}>
      {viewPorts.map(statsData => (
        stats[statsData] ? renderViewPortChild(statsData) : <Spinner/>
      ))}
    </Grid>
  );

  const renderViewPortChild = statsData => (
    <ChartContainer statsData={statsData} dispatch={dispatch} history={history}/>
  );

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        <h2>Statistics</h2>
        {!viewMode ? <CircularProgress style={{ margin: 12 }} size={24}/> : renderInfoBar()}
      </Paper>
      {!stats ? <Spinner/> : renderViewPort(stats)}
      <p style={{ color: 'red' }}>{props.errorMessage && !props.messageConfirmed}</p>
    </main>
  );
};

Statistics.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  messageConfirmed: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    viewMode: state.stats.viewMode,
    viewBranch: state.stats.viewBranch,
    viewGroup: state.stats.viewGroup,
    stats: state.stats.results,
    errorMessage: state.stats.error,
    successMessage: state.stats.success,
    messageConfirmed: state.stats.confirmed
  };
}

export default connect(mapStateToProps, {})(withStyles(Wrapper, { withTheme: true })(withRouter(Statistics)));





