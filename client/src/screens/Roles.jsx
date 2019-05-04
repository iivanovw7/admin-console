import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getRoles } from '../actions';
import RolesContainer from '../components/Roles/RolesContainer';
import AddNewButton from '../components/UI/AddButton';
import { PageSelector } from '../components/UI/PageSelector';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';

const Roles = props => {
  const { classes, history, dispatch } = props;
  const limit = 7; //default limit of elements for current page

  //current page number
  const [currentPage, setCurrentPage] = useState(props.roles.list.page);
  const roles = props.roles.list.output; //list of elements fetched

  useEffect(() => {
    props.dispatch(getRoles(currentPage, limit, history));
  }, [currentPage]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  const renderRolesContainer = () => (
    <RolesContainer
      roles={roles}
      page={currentPage}
      limit={limit}
      dispatch={dispatch}
    />
  );

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.titleContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Roles</h2>
          </div>
          <AddNewButton history={history} element={'roles'}/>
        </Paper>
        {!roles ? <Spinner/> : renderRolesContainer()}
      </div>
      <Paper
        className={classes.controlsContainer}
        style={{ marginTop: '24px', marginBottom: '24px' }}
      >
        <p style={{ color: 'red' }}>
          {props.errorMessage && !props.messageConfirmed}
        </p>
        <PageSelector classes={classes} data={props.roles} handlePage={handlePage}/>
      </Paper>
    </main>
  );
};

Roles.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  messageConfirmed: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    roles: state.roles,
    errorMessage: state.roles.error,
    successMessage: state.roles.success,
    messageConfirmed: state.roles.confirmed
  };
}

export default connect(mapStateToProps)(withStyles(Wrapper, { withTheme: true })(withRouter(Roles)));


