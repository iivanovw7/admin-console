import express from 'express';
import validate from 'express-validation';
import { catchErrors, checkAccess } from '../helper-functions';
import * as paramValidation from '../config/validation/messages.config';
import * as messages from '../controllers/message.controller';


const router = express.Router();

router.route('/')
      // GET /api/messages - Get full list of messages
      .get(checkAccess, validate(paramValidation.getPage), catchErrors(messages.listMessages));

router.route('/search')
      // GET /api/messages/search - Gets listRoles with search results by subject, name, surname
      .get(checkAccess, validate(paramValidation.pageSearch), catchErrors(messages.searchMessages));

router.route('/new')
      // POST /api/messages/new - Create new message
      .post(checkAccess, validate(paramValidation.sendMessage), catchErrors(messages.sendMessage));

router.route('/:id')
      // GET /api/messages/:id - Get single message by id
      .get(checkAccess, validate(paramValidation.getMessage), catchErrors(messages.getMessage));

router.route('/group/:id')
      // GET /api/messages/group/:id - Get messages by groupId
      .get(checkAccess, validate(paramValidation.getPageById), catchErrors(messages.getPageByGroup));

router.route('/branch/:id')
      // GET /api/messages/branch/:id - Get messages by branchId
      .get(checkAccess, validate(paramValidation.getPageById), catchErrors(messages.getPageByBranch));

router.route('/user/:id')
      // GET /api/messages/user/:id - Get messages by user id
      .get(checkAccess, validate(paramValidation.getPageById), catchErrors(messages.getPageByUser));


export { router as messageRoutes };


