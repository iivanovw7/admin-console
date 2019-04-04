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

const Groups = props => {
  const { classes, history } = props;
  const limit = 8; //default limit of elements for current page

  //current page number
  const [currentPage, setCurrentPage] = useState(props.groups.list.page);
  const list = props.groups.list.output; //list of elements fetched

  useEffect(() => {
    props.dispatch(getGroups(currentPage, limit, history));
  }, [currentPage]);

  function handlePage(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <main className={classes.contentList}>
      <div>
        <Paper className={classes.controlsContainer}>
          <div className={classes.selectorsContainer}>
            <h2>Groups</h2>
          </div>
          <AddNewButton history={history} element={'groups'}/>
        </Paper>
        {
          (list) ?
            (<GroupsContainer dispatch={props.dispatch}/>) : (<p>Loading...</p>)
        }
      </div>
      <br/>
      <Paper className={classes.controlsContainer}>
        <div/>
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
  return { groups: state.groups };
}

export default connect(mapStateToProps, { getGroups })(withStyles(Wrapper, { withTheme: true })(withRouter(Groups)));


