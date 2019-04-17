import { Paper, withStyles } from '@material-ui/core';
import { debounce } from 'debounce';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMessages, searchMessages } from '../actions';
import MessagesContainer from '../components/Messages/MessagesContainer';
import { LimitSelector } from '../components/UI/LimitSelector';
import { PageSelector } from '../components/UI/PageSelector';
import SearchBar from '../components/UI/SearchBar';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';
import AddNewButton from '../components/UI/AddButton.jsx';

const Messages = props => {

  const { classes, history, dispatch } = props;
  const limits = [10, 20, 30, 50, 60];

  //current page number
  const [limit, setLimit] = useState(limits[0]);
  const [searchTerm, setSearchTerm] = useState(props.messages.list.search ? props.messages.list.search : '');
  const [currentPage, setCurrentPage] = useState(props.messages.list.page);
  const messages = props.messages.list.output; //list of elements fetched

  useEffect(() => {
    searchTerm.length > 2 ?
      dispatch(searchMessages(currentPage, limit, searchTerm, history)) :
      dispatch(getMessages(currentPage, limit, history));
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

  const renderMessagesContainer = () => (
    <MessagesContainer
      messages={messages}
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
            <h2>Messages</h2>
          </div>
          <AddNewButton history={history} element={'messages'}/>
        </Paper>
        <SearchBar
          value={searchTerm}
          tooltip={'Search by User`s Name, Surname or Subject'}
          onSearchTermChange={handleNewSearch}
        />
        {!messages || messages.length > limit ? <Spinner/> : renderMessagesContainer()}
      </div>
      <Paper
        className={classes.controlsContainer}
        style={{ marginTop: '24px', marginBottom: '24px' }}
      >
        <LimitSelector classes={classes} limit={limit} limits={limits} handleLimit={handleLimit}/>
        <p style={{ color: 'red' }}>
          {props.errorMessage && !props.messageConfirmed}
        </p>
        <PageSelector classes={classes} data={props.messages} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  messageConfirmed: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    errorMessage: state.messages.error,
    successMessage: state.messages.success,
    messageConfirmed: state.messages.confirmed
  };
}

export default connect(mapStateToProps, { getMessages })(withStyles(Wrapper, { withTheme: true })(withRouter(Messages)));

