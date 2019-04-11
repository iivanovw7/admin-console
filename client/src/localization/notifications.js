import * as types from '../constants/ActionTypes';

export function formLocalizedNotification(name, action, locale, newState) {

  const actionString = action.type.split('_')[0];
  const modelName = strings[locale][action.type.split('_')[1].toLocaleLowerCase()];

    switch (action.type) {
      case types.ERROR: {
        return `${strings[locale].error}`;
      }
      case types.FETCH_ERROR: {
        return `${strings[locale].fetchError}`;
      }
      case types.AUTHENTICATION_ERROR: {
        return `${strings[locale].authError}`;
      }
      default:
        if (actionString === 'CHANGE' && action.type.split('_')[2] === 'STATUS') {
          return (
            `${modelName} "${name}" ${strings[locale].changeStatus} "${newState}"!`
          );
        }
        if (actionString === 'DELETE') {
          return (
            `${modelName} "${name}" ${strings[locale].deleted}`
          );
        }
        if (actionString === 'ADD') {
          return (
            `${modelName} "${name}" ${strings[locale].addSuccess}`
          );
        }
        if (actionString === 'UPDATE') {
          return (
            `${modelName} "${name}" ${strings[locale].updateSuccess}`
          );
        }
    }
}

let strings = {
  en: {
    error: 'Error!',
    fetchError: 'Error while getting data!',
    authError: 'Authentication error!',
    user: 'User',
    ticket: 'Ticket',
    role: 'Role',
    branch: 'Branch',
    group: 'Group',
    message: 'Message',
    addSuccess: 'created!',
    updateSuccess: 'successfully modified!',
    changeStatus: 'status changed to',
    deleted: 'successfully removed!',
  }
};


