import express from 'express';
import validate from 'express-validation';
import * as paramValidation from '../config/validation/groups.config';
import * as groups from '../controllers/group.controller';
import { catchErrors, checkAccess } from '../helper-functions';

const router = express.Router();

router.route('/')
      // GET /api/groups - Get full list of groups
      .get(checkAccess, validate(paramValidation.getPageGroups), catchErrors(groups.listGroups))
      // POST /api/groups - Create new group
      .post(checkAccess, validate(paramValidation.addGroup), catchErrors(groups.addGroup));

router.route('/:id')
      // GET /api/groups/:id - Get group and users by id
      .get(checkAccess, validate(paramValidation.getGroup), catchErrors(groups.getGroup))
      // DELETE /api/groups/:id - deletes group by id and applies default group to users
      .delete(checkAccess, validate(paramValidation.removeGroup), catchErrors(groups.removeGroup))
      // PUT /api/groups/:id - Update group fields
      .put(checkAccess, validate(paramValidation.updateGroup), catchErrors(groups.updateGroup));

export { router as groupRoutes };

