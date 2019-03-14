import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../controllers/helper-functions';
import * as paramValidation from '../config/param-validation-messages';
import * as messages from '../controllers/message.controller';


const router = express.Router();

router.route('/')

      /** GET /api/messages - Get full list of messages */
      .get(checkAccess, catchErrors(messages.list));

router.route('/search')

      /** GET /api/messages/search - Gets page with search results by subject, name, surname */
      .get(validate(paramValidation.pageSearch), checkAccess, catchErrors(messages.search));

router.route('/page')

      /** GET /api/messages/page - Get page from income messages list */
      .get(validate(paramValidation.getPage), checkAccess, catchErrors(messages.page));

router.route('/new')

      /** POST /api/messages/new - Create new message */
      .post(validate(paramValidation.sendMessage), checkAccess, catchErrors(messages.send));

router.route('/:id')

      /** GET /api/messages/:id - Get single message by id */
      .get(validate(paramValidation.getMessage), checkAccess, catchErrors(messages.get));

router.route('/group/:id')

      /** GET /api/messages/group/:id - Get messages by groupId  */
      .get(validate(paramValidation.getPageById), checkAccess, catchErrors(messages.pageByGroup));

router.route('/branch/:id')

      /** GET /api/messages/branch/:id - Get messages by branchId */
      .get(validate(paramValidation.getPageById), checkAccess, catchErrors(messages.pageByBranch));

router.route('/user/:id')

      /** GET /api/messages/user/:id - Get messages by user id */
      .get(validate(paramValidation.getPageById), checkAccess, catchErrors(messages.pageByUser));


export { router as messageRoutes };


