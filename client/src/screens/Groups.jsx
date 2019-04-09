import { Paper, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getGroups } from '../actions/groups';
import GroupsContainer from '../components/Groups/GroupsContainer';
import AddNewButton from '../components/UI/AddButton';
import { PageSelector } from '../components/UI/PageSelector';
import { Wrapper } from '../components/UI/ThemeProperties';
import Spinner from '../components/UI/Spinner';
import RolesContainer from './Roles';

const Groups = props => {
  const { classes, history } = props;
  const limit = 7; //default limit of elements for current page

  //current page number
  const [currentPage, setCurrentPage] = useState(props.groups.list.page);
  const groups = props.groups.list.output; //list of elements fetched

  useEffect(() => {
    props.dispatch(getGroups(currentPage, limit, history));
  }, [currentPage]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Groups</h2>
          </div>
          <AddNewButton history={history} element={'groups'}/>
        </Paper>
        {!groups ? <Spinner /> : <GroupsContainer groups={groups} page={currentPage} limit={limit} dispatch={props.dispatch}/>}
      </div>
      <Paper className={classes.controlsContainer} style={{marginTop: '24px', marginBottom: '24px'}}>
        <p style={{color: 'red'}}>{props.errorMessage}</p>
        <PageSelector classes={classes} data={props.groups} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Groups.propTypes = {
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

export default connect(mapStateToProps, { getGroups })(withStyles(Wrapper, { withTheme: true })(withRouter(Groups)));


