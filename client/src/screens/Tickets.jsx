import { Paper, withStyles } from '@material-ui/core';
import { debounce } from 'debounce';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTickets, searchTickets } from '../actions';
import { LimitSelector } from '../components/UI/LimitSelector';
import { PageSelector } from '../components/UI/PageSelector';
import SearchBar from '../components/UI/SearchBar';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';
import TicketsContainer from '../components/Tickets/TicketsContainer';

const Tickets = props => {

  const { classes, history, dispatch } = props;
  const limits = [10, 20, 30, 50, 60];

  //current page number
  const [limit, setLimit] = useState(limits[0]);
  const [searchTerm, setSearchTerm] = useState(props.tickets.list.search ? props.tickets.list.search : '');
  const [currentPage, setCurrentPage] = useState(props.tickets.list.page);
  const tickets = props.tickets.list.output; //list of elements fetched

  useEffect(() => {
    searchTerm.length > 2 ?
      dispatch(searchTickets(currentPage, limit, searchTerm, history)) :
      dispatch(getTickets(currentPage, limit, history));
  }, [currentPage, limit, searchTerm]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  const handleLimit = event => {
    setLimit(event.target.value);
  };

  const ticketsSearch = debounce((value) => {
    setCurrentPage(1);
    setSearchTerm(value);
  }, 50);

  function handleNewSearch(value) {
    ticketsSearch(value);
  }

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Reports</h2>
          </div>
        </Paper>
        <SearchBar
          value={searchTerm}
          tooltip={'Search by Ticket author`s Name or Subject'}
          onSearchTermChange={handleNewSearch}
        />
        {!tickets ? <Spinner/> :
          <TicketsContainer tickets={tickets} page={currentPage} limit={limit} search={searchTerm}
                          dispatch={dispatch}/>}
      </div>
      <Paper className={classes.controlsContainer}
             style={{ marginTop: '24px', marginBottom: '24px' }}>
        <LimitSelector classes={classes} limit={limit} limits={limits} handleLimit={handleLimit}/>
        <p style={{ color: 'red' }}>{props.errorMessage}</p>
        <PageSelector classes={classes} data={props.tickets} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Tickets.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    tickets: state.tickets,
    errorMessage: state.tickets.error,
    successMessage: state.tickets.success
  };
}

export default connect(mapStateToProps, { getTickets })(withStyles(Wrapper, { withTheme: true })(withRouter(Tickets)));

