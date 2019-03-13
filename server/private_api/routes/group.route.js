import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation-groups';
import * as groups from '../controllers/group.controller';
import { catchErrors } from '../controllers/helper-functions';

const router = express.Router();

router.route('/')

      /** GET /api/groups - Get full list of groups */
      .get(catchErrors(groups.list))

      /** POST /api/groups - Create new group */
      .post(validate(paramValidation.addGroup), catchErrors(groups.add));

router.route('/page')

      /** GET /api/groups/page - Get page from groups list */
      .get(validate(paramValidation.getPageGroups), catchErrors(groups.page));

router.route('/:id')

      /** GET /api/groups/:id - Get group and users by id */
      .get(validate(paramValidation.getGroup), catchErrors(groups.get))

      /** DELETE /api/groups/:id - deletes group by id and applies default group to users */
      .delete(validate(paramValidation.removeGroup), catchErrors(groups.remove))

      /** PUT /api/groups/:id - Update group fields */
      .put(validate(paramValidation.updateGroup), catchErrors(groups.update));

export { router as groupRoutes };

