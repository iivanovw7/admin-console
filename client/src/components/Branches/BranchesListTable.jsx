import React from 'react';
import TableHead from './BranchesListContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const BranchesListTable = props => {

  return  (

    <div></div>

  );

};

/*

  <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell}>Name</TableCell>
          <TableCell className={classes.tableCell} align="center">Status</TableCell>
          <TableCell className={classes.tableCell} align="center"></TableCell>
          <TableCell className={classes.tableCell} align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row" className={classes.tableCell}>
              {row.name}
            </TableCell>
            <TableCell className={classes.tableCell} align="center">{row.status}</TableCell>
            <TableCell className={classes.tableCell} align="center">{row.statusControl}</TableCell>
            <TableCell className={classes.tableCell} align="center">{row.branchControl}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

 */