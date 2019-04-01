import { Grid } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from './InputTextField';


export const InputContainer = (props) => {

  const {data, dataType} = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <Field
          name={dataType}
          type={dataType}
          component={renderTextField}
          label={dataType}
          id={dataType}
          {...data}
        />
      </Grid>
    </Grid>
  );

};
