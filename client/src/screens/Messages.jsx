import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'debounce';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getMessages, searchMessages } from '../actions';
import MessagesContainer from '../components/Messages/MessagesContainer';
import ButtonAddNew from '../components/UI/ButtonAddNew.jsx';
import { Selector } from '../components/UI/Selector';
import { PageSelector } from '../components/UI/PageSelector';
import SearchBar from '../components/UI/SearchBar';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';

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
          <ButtonAddNew history={history} element={'messages'}/>
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
        <Selector
          classes={classes}
          title={'Results limit'}
          option={limit}
          options={limits}
          disabled={false}
          handleSelect={handleLimit}
        />
        <PageSelector classes={classes} data={props.messages} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}

export default connect(mapStateToProps, { getMessages })(withStyles(Wrapper, { withTheme: true })(withRouter(Messages)));

