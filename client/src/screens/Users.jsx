import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { getUsers } from '../actions/users';
import { LimitSelector } from '../components/UI/LimitSelector';
import { PageSelector } from '../components/UI/PageSelector';
import SearchBar from '../components/UI/SearchBar';
import { Wrapper } from '../components/UI/ThemeProperties';
import { withRouter } from 'react-router-dom';
import Spinner from '../components/UI/Spinner';
import UsersContainer from '../components/Users/UsersContainer';

const Users = props => {

  const { classes, history, dispatch } = props;
  const limits = [8, 10, 20, 30, 50, 60];

  //current page number
  const [limit, setLimit] = useState(limits[0]);
  const [currentPage, setCurrentPage] = useState(props.users.list.page);
  const users = props.users.list.output; //list of elements fetched

  useEffect(() => {
    dispatch(getUsers(currentPage, limit, history));
  }, [currentPage, limit]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  const handleLimit = event => {
    setLimit(event.target.value);
  };

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Users</h2>
          </div>
        </Paper>
        <SearchBar tooltip={'Search by User`s Name or Email'}/>
        {!users ? <Spinner /> : <UsersContainer users={users} page={currentPage} limit={limit} dispatch={dispatch}/>}
      </div>
      <Paper className={classes.controlsContainer} style={{marginTop: '24px', marginBottom: '24px'}}>
        <LimitSelector classes={classes} limit={limit} limits={limits} handleLimit={handleLimit}/>
        <p style={{color: 'red'}}>{props.errorMessage}</p>
        <PageSelector classes={classes} data={props.users} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users,
    errorMessage: state.branches.error,
    successMessage: state.branches.success,
  };
}

export default connect(mapStateToProps, { getUsers })(withStyles(Wrapper, { withTheme: true })(withRouter(Users)));

