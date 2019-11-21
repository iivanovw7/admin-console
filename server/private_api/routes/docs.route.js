import express from 'express';
import * as docs from '../controllers/docs.controller';
import { docsRoutes } from '../config/constants.config';
import { checkAccess } from '../helper-functions';

const router = express.Router();

router.route('/')
      // GET /docs - Get default API documentation
      // TODO switch to checkAccess after testing
      .get(docs.getDocs());
      //.get(checkAccess, docs.getDocs());

router.route(docsRoutes)
      // GET /docs/private - returns swagger config page for private API
      // GET /docs/public - returns swagger config page for public API
      // GET /docs/swagger - returns Swagger "Petstore" default page
      // GET /docs/openapi - returns Swagger "openapi" default page
      // GET /docs/parameters.json - returns Swagger components json file
      // GET /docs/responses.json - returns Swagger responses json file
      // TODO switch to checkAccess after testing
      .get(docs.getDocsConfig);
      //.get(checkAccess, docs.getDocsConfig);

export { router as docsRoutes };
