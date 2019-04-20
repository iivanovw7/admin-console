import { CircularProgress, TableCell, TableRow, Fade } from '@material-ui/core';
import * as axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as URL from '../../constants/api';

export const BranchesContainerElement = props => {

  const { classes, row, handleBranchClick, displayStatus } = props;
  const [users, setUsersQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const queryUrl = `${URL.PRIVATE_API}/stats/branch`;
  const queryParams = { params: { branch: row._id }, withCredentials: true };

  useEffect(() => {
    const countBranchUsers = async () => {
      setIsLoading(true);
      return await axios.get(queryUrl, queryParams)
                        .then(result => {
                          setUsersQuantity(result.data);
                          setIsLoading(false);
                        })
                        .catch(error => {
                          setIsError(true);
                          setIsLoading(false);
                        });
    };
    countBranchUsers();
  }, []);

  return (
    <Fade in={true}>
      <TableRow
        onClick={() => {
          handleBranchClick(row._id);
        }}
        className={classes.branchRowClass}
      >
        <TableCell
          component="th"
          scope="row"
          className={classes.branchNameCell}
        >
          {row.name}
        </TableCell>
        <TableCell className={classes.branchAddressCell} align="center">
          {row.address}
        </TableCell>
        <TableCell className={classes.branchEmployeesCell} align="center">
          {isError && Error}
          {isLoading ? <CircularProgress size={12}/> : users.total}
        </TableCell>
        <TableCell className={classes.tableCell} align="center">
          <strong>
            {displayStatus(row.status)}
          </strong>
        </TableCell>
      </TableRow>
    </Fade>
  );
};

BranchesContainerElement.propTypes = {
  classes: PropTypes.any,
  displayStatus: PropTypes.func.isRequired,
  handleBranchClick: PropTypes.func.isRequired,
  row: PropTypes.object.isRequired
};