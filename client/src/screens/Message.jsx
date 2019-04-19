import { Paper, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBranches, getGroups, getSingleUser } from '../actions';
import CreateMessageContainer from '../components/Message/CreateMessageContainer';
import ViewMessageContainer from '../components/Message/ViewMessageContainer';
import Spinner from '../components/UI/Spinner';
import { Wrapper } from '../components/UI/ThemeProperties';

const Message = props => {
  const { classes, history, dispatch } = props;
  const user = props.users.user;
  const message = props.messages.message;
  const groups = props.groups.list.output;
  const branches = props.branches.list.output;

  useEffect(() => {
    dispatch(getSingleUser(Cookies.get('id'), history, false));
    dispatch(getGroups(1, 100, history));
    dispatch(getBranches(1, 100, history));
  }, []);

  function displayTitle() {
    if (message.subject) {
      return subjectTitle();
    }
    return newTitle();
  }

  function displayContainer() {
    if (message.subject) {
      return viewMessageContainer();
    }
    return createMessageContainer();
  }

  const subjectTitle = () => (
    <div className={classes.selectorsContainer}>
      <p>Notification:&nbsp;</p>
      <h4>&nbsp;{message.subject}</h4>
    </div>
  );

  const newTitle = () => (
    <div className={classes.selectorsContainer}>
      <h2>New notification</h2>
    </div>
  );

  const createMessageContainer = () => (
    <CreateMessageContainer
      user={user}
      group={groups}
      branch={branches}
      message={message}
      history={history}
      dispatch={dispatch}
    />
  );

  const viewMessageContainer = () => (
    <ViewMessageContainer
      message={message}
      history={history}
    />
  );

  return (
    <main className={classes.contentSingle}>
      <Paper className={classes.titleContainer}>
        {!user || !message ? <CircularProgress style={{margin: 24}} size={24}/> : displayTitle()}
      </Paper>
      {!user || !message || !groups || !branches ? <Spinner/> : displayContainer()}
    </main>
  );
};

Message.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    users: state.users,
    roles: state.roles,
    branches: state.branches,
    groups: state.groups
  };
}

export default connect(mapStateToProps, {})(withStyles(Wrapper, { withTheme: true })(withRouter(Message)));