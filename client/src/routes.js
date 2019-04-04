import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Statistics from './screens/Statistics';
import Messages from './screens/Messages';
import Branches from './screens/Branches';
import BranchesDetails from './screens/Branch';
import Users from './screens/Users';
import Roles from './screens/Roles';
import Groups from './screens/Groups';
import Tickets from './screens/Tickets';
import Login from './screens/Login';
import protectedContent from './layouts/protectedContent';
import loginLayout from './layouts/loginLayout';

const NoMatch = ({ location }) => (
  <div>
    <h3><code>{location.pathname}</code> not found!</h3>
  </div>
);

export default (
  <Switch>
    <Route exact path={'/'} component={loginLayout(Login)}/>
    <Route path={'/statistics'} component={protectedContent(Statistics)}/>
    <Route path={'/roles'} component={protectedContent(Roles)}/>
    <Route path={'/staff'} component={protectedContent(Users)}/>
    <Route path={'/messages'} component={protectedContent(Messages)}/>
    <Route path={'/tickets'} component={protectedContent(Tickets)}/>
    <Route path={'/groups'} component={protectedContent(Groups)}/>
    <Route path={'/branches/:id'} component={protectedContent(BranchesDetails)}/>
    <Route path={'/branches/new'} component={protectedContent(BranchesDetails)}/>
    <Route path={'/branches'} component={protectedContent(Branches)}/>
    <Route component={NoMatch}/>
  </Switch>
);


