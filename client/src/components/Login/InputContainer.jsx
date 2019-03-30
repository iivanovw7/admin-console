import { Grid } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from './InputTextField';


export const InputContainer = (props) => {

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <Field
          name={props.dataType}
          type={props.dataType}
          component={renderTextField}
          label={props.dataType}
          id={props.dataType}
          {...props.data}
        />
      </Grid>
    </Grid>
  );

};
