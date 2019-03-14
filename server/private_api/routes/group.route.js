import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation-groups';
import * as groups from '../controllers/group.controller';
import { catchErrors, checkAccess } from '../controllers/helper-functions';

const router = express.Router();

router.route('/')

      /** GET /api/groups - Get full list of groups */
      .get(checkAccess, catchErrors(groups.list))

      /** POST /api/groups - Create new group */
      .post(validate(paramValidation.addGroup), checkAccess, catchErrors(groups.add));

router.route('/page')

      /** GET /api/groups/page - Get page from groups list */
      .get(validate(paramValidation.getPageGroups), checkAccess, catchErrors(groups.page));

router.route('/:id')

      /** GET /api/groups/:id - Get group and users by id */
      .get(validate(paramValidation.getGroup), checkAccess, catchErrors(groups.get))

      /** DELETE /api/groups/:id - deletes group by id and applies default group to users */
      .delete(validate(paramValidation.removeGroup), checkAccess, catchErrors(groups.remove))

      /** PUT /api/groups/:id - Update group fields */
      .put(validate(paramValidation.updateGroup), checkAccess, catchErrors(groups.update));

export { router as groupRoutes };

