import { Grid } from '@material-ui/core';
import React from 'react';
import { Field } from 'redux-form';
import { renderTextField } from '../UI/Forms/TextField';

export const LoginField = props => {

  const { dataType } = props;

  return (
    <Grid container spacing={16} alignItems="flex-end">
      <Grid item md={true} sm={true} xs={true}>
        <Field
          name={dataType}
          type={dataType}
          component={renderTextField}
          label={dataType}
          id={dataType}
          rows={1}
          rowsMax={1}
          variant={'standard'}

        />
      </Grid>
    </Grid>
  );

};