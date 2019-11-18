import swaggerUi from 'swagger-ui-express';
import httpStatus from 'http-status';
import path from 'path';

const options = {
    explorer: true,
    swaggerOptions: {
        // "Try it out" functionality removed with "supportedSubmitMethods"
        // due to swagger problems with cookies access
        // https://github.com/swagger-api/swagger-js/issues/1163
        supportedSubmitMethods:[],
        urls: [
            {
                url: path.join('/api/docs/private'),
                name: 'Private API'
            },
            {
                url: path.join('/api/docs/public'),
                name: 'Public API'
            },
            {
                url: path.join('/api/docs/swagger'),
                name: 'Swagger Petstore'
            },
            {
                url: path.join('/api/docs/openapi'),
                name: 'Swagger OpenAPI'
            }
        ]
    }
};

/**
 * Returns swagger-ui component (screen) with preconfigured setup
 *
 * @return {Function} swagger-ui-express instance
 */
const getDocs = () => {
    return swaggerUi.setup(null, options);
};

/**
 * Returns swagger config (config component) file from docs dir, filename is taken out of route path
 *
 * @param {string} req - req.path
 * @param {string} req - req.pathname
 * @param res
 * @return {*|Response} Returns json documentation file,
 *                      or 404 NotFound Status if file does not exist
 */
const getDocsConfig = (req, res) => {
    // Sets up current pathname
    const pathname = (typeof req.pathname === 'string') ? req.pathname : req.path;

    // Create filename
    const filename = `../../docs/${pathname}${!pathname.includes('.json') ? '.json' : ''}`;

    try {
        // Gets config file
        const configFile = require(path.resolve(__dirname, filename));

        return (configFile && configFile.hasOwnProperty('components'))
            ? res.send(configFile)
            : res.sendStatus(httpStatus.NOT_FOUND);
    }

    catch(e) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
};

export { getDocs, getDocsConfig };
