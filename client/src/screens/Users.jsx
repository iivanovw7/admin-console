import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'debounce';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers, searchUsers } from '../actions';
import { NumbersSelector } from '../components/UI/NumbersSelector';
import { PageSelector } from '../components/UI/PageSelector';
import SearchBar from '../components/UI/SearchBar';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';
import UsersContainer from '../components/Users/UsersContainer';

const Users = props => {

  const { classes, history, dispatch } = props;
  const limits = [10, 20, 30, 50, 60];

  //current page number
  const [limit, setLimit] = useState(limits[0]);
  const [searchTerm, setSearchTerm] = useState(props.users.list.search ? props.users.list.search : '');
  const [currentPage, setCurrentPage] = useState(props.users.list.page);
  const users = props.users.list.output; //list of elements fetched

  useEffect(() => {
    searchTerm.length > 2 ?
      dispatch(searchUsers(currentPage, limit, searchTerm, history)) :
      dispatch(getUsers(currentPage, limit, history));
  }, [currentPage, limit, searchTerm]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  const handleLimit = event => {
    setLimit(event.target.value);
  };

  const usersSearch = debounce((value) => {
    setCurrentPage(1);
    setSearchTerm(value);
  }, 50);

  function handleNewSearch(value) {
    usersSearch(value);
  }

  const renderUsersContainer = () => (
    <UsersContainer
      users={users}
      page={currentPage}
      limit={limit}
      search={searchTerm}
      dispatch={dispatch}
    />
  );

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Users</h2>
          </div>
        </Paper>
        <SearchBar
          value={searchTerm}
          tooltip={'Search by User`s Name, Surname or Email'}
          onSearchTermChange={handleNewSearch}
        />
        {!users ? <Spinner/> : renderUsersContainer()}
      </div>
      <Paper
        className={classes.controlsContainer}
        style={{ marginTop: '24px', marginBottom: '24px' }}
      >
        <NumbersSelector
          classes={classes}
          title={'Results limit'}
          option={limit}
          options={limits}
          disabled={false}
          handleSelect={handleLimit}
        />
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
    users: state.users
  };
}

export default connect(mapStateToProps)(withStyles(Wrapper, { withTheme: true })(withRouter(Users)));

