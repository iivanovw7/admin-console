import * as types from '../constants/ActionTypes';

export function formLocalizedNotification(name, action, locale, newState) {

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
      case types.UPDATE_BRANCH: {
        return `${name} ${strings[locale].updateSuccess}`;
      }
      case types.UPDATE_GROUP: {
        return `${name} ${strings[locale].updateSuccess}`;
      }
      case types.UPDATE_ROLE: {
        return `${name} ${strings[locale].updateSuccess}`;
      }
      case types.UPDATE_USER: {
        return `${name} ${strings[locale].updateSuccess}`;
      }
      case types.ADD_BRANCH: {
        return `${name} ${strings[locale].addSuccess}`;
      }
      case types.ADD_GROUP: {
        return `${name} ${strings[locale].addSuccess}`;
      }
      case types.ADD_ROLE: {
        return `${name} ${strings[locale].addSuccess}`;
      }
      case types.CHANGE_GROUP_STATUS: {
        return `${name} ${strings[locale].changeStatus} "${newState}"!`;
      }
      case types.CHANGE_ROLE_STATUS: {
        return `${name} ${strings[locale].changeStatus} "${newState}"!`;
      }
      case types.CHANGE_USER_STATUS: {
        return `${name} ${strings[locale].changeStatus} "${newState}"!`;
      }
      case types.DELETE_GROUP: {
        return `${name} ${strings[locale].deleted}`;
      }
      case types.DELETE_ROLE: {
        return `${name} ${strings[locale].deleted}`;
      }
      default:
        return '';
    }
}

let strings = {
  en: {
    error: 'Error!',
    fetchError: 'Error while getting data!',
    authError: 'Authentication error!',
    addSuccess: 'created!',
    updateSuccess: 'successfully modified!',
    changeStatus: 'status changed to',
    deleted: 'successfully removed!'
  }

};


