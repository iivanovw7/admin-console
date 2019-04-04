import { withStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Buttons } from './ThemeProperties';

const AddButton = props => {

  const { classes, history, element } = props;

  function handleClick() {
    return history.push(history.push(`/${element}/new`));
  }

  return (
    <div className={classes.formRoot}>
      <Button size="small" className={classes.mobile}
              onClick={() => {
                handleClick();
              }}>
        <strong>Create</strong>
      </Button>
      <Fab color="primary" size="small" aria-label="Add" className={classes.desktop}
           onClick={() => {
             handleClick();
           }}>
        <AddIcon/>
      </Fab>
    </div>
  );

};

AddButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(Buttons, { withTheme: true })(AddButton);