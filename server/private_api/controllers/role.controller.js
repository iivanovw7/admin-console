const User = require('../../db/models/User');
const Role = require('../../db/models/Role');
const httpStatus = require('http-status');
const { defaultRoles, serviceRoles } = require('../config/param-roles');

const catchErrors = fn => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

/**
 * Function forms one page of objects out of incoming list of objects
 * no mater what list it got in parameters
 *
 * @param currPage: {number}, current page number
 * @param currLimit: {number}, number of elements for one page
 * @param list: {[]}, array of objects
 * @param elements: {number}, total count of elements
 *
 * @returns {Promise.<void>}
 */
const formPage =
  async (currPage = 1,
         currLimit = 10,
         list = [],
         elements = 0) => {

    //needed to keep input numbers inside certain limits
    //in order to prevent unpredicted outputs
    Number.prototype.limited = function (min, max) {
      return Math.min(Math.max(this, min), max);
    };

    //applying limits of elements for one page
    const limit = currLimit.limited(1, 25);
    //applying limits for maximum page number value
    const pages = Math.ceil(elements / limit);
    //applying limits for input pageNumber value
    const page = currPage.limited(1, pages);

    const skipped = (page * limit) - limit;
    const output = list.slice(skipped, skipped + limit);

    return {
      page,
      limit,
      pages,
      output
    };
  };

//function checks if role status belongs to list of default roles
function checkRole(role) {
  for (const mainRole of defaultRoles) {
    if (mainRole === role.code) {
      return true;
    }
  }
  return false;
}

/**
 * Get roles list.
 * @returns {Role[]}
 */
function list(req, res, next) {
  catchErrors(
    Role.find({}).then(roles => {
      res.json(
        [
          { Total: roles.length },
          roles
        ]
      );
    })
  );
}

/**Get one page of roles
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
function page(req, res, next) {
  catchErrors(
    Role.find({})
        .then(roles => {
          formPage(
            req.headers.page,
            req.headers.limit,
            roles,
            roles.length
          ).then(page =>
            res.json({
              page
            })
          ).catch(e => next(e));
        })
  );
}

/**
 * Get role
 * @requires {objectId} id: req.params.id
 * @returns {role, [users]}
 */
function get(req, res, next) {
  catchErrors(
    Role.findOne({ _id: req.params.id })
        .then(role => {
          if (!role) {
            return res.send(httpStatus.NOT_FOUND);
          }
          User.find({ role: req.params.id })
              .then(users => {
                res.status(200).json(
                  [
                    { role: role },
                    { users: users }
                  ]);
              })
              .catch(e => next(e));
        })
        .catch(e => next(e))
  );
}

/**
 * Update existing role
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} description: req.headers.description
 * @parameter {string} active: req.headers.active
 *
 * @returns {Role} Returns updated role
 */
function update(req, res, next) {

  catchErrors(
    Role.findOne({ _id: req.params.id })
        .then(role => {

          const data = {
            description: req.headers.description,
            active:
              req.headers.active ?
                true
                :
                (role.code === 'ADMIN' || role.code === 'USER'),
            public: req.headers.public,
            editable: req.headers.editable
          };

          Role.findOneAndUpdate(
            { _id: req.params.id },
            { $set: data },
            { new: true })
              .then(updatedRole =>
                res.status(200).json({
                  updatedRole
                }))
              .catch(e => next(e));
        })
  );
}

/**
 * Function changes current to a USER
 *
 * @param req
 * @param res
 * @param next
 * @param params
 *
 * @returns
 * { Removed: oldRole },
 * { NewRole: role },
 * { Changes: result }
 */
function swap(req, res, next, params) {

  catchErrors(
    Role.findOne({ code: 'USER' })
        .then(role => {
          if (!role) {
            return res.send(
              httpStatus.INTERNAL_SERVER_ERROR
            );
          }
          User.updateMany(
            { role: { _id: req.params.id } },
            { $set: { role: { _id: role._id } } })
              .then(result => {
                res.status(200).json(
                  [
                    { RequestRoleId: req.params.id },
                    { RemovedRole: params.removedRole },
                    { NewRole: role },
                    { Changes: result }
                  ]
                );
              }).catch(e => next(e));
        })
        .catch(e => next(e))
  );

}

/**
 * Function creates new Role if it doesn`t exists in db
 *
 * @requires name: req.headers.name,
 * @requires code: req.headers.code,
 * @requires description: req.headers.description,
 * active: req.headers.active,
 * public: req.headers.public,
 * editable: req.headers.editable
 * @param req
 * @param res
 * @param next
 *
 * @returns
 * {Role}
 */
function add(req, res, next) {

  Role.findOne({ code: req.headers.code, name: req.headers.name })
      .then(role => {
        if (role) {
          return res.send(
            httpStatus.BAD_REQUEST
          );
        } else {

          const newRole = new Role({
            name: req.headers.name,
            code: req.headers.code,
            description: req.headers.description,
            active: req.headers.active,
            public: req.headers.public,
            editable: req.headers.editable
          });

          newRole.save()
                 .then(saved => {
                   return res.status(201).json(
                     { created: saved }
                   );
                 }).catch(e => next(e));
        }
      }).catch(e => next(e));

}

/**
 * Deletes role, removes all same roles in Users list
 * @requires {objectId} id: req.params.id
 * @param {objectId} req.headers.role
 * another role Id, to change Users roles
 * @returns swapRoles(req,res,next,{removedRole: removedRole});
 * (Calls swap roles function to change deleted role to another one,
 * if role parameter passed in headers, if not - removes roles)
 * )
 */
function remove(req, res, next) {

  catchErrors(
    Role.findOne({ _id: req.params.id })
        .then(role => {
          if (!checkRole(role)) {
            Role.findByIdAndRemove(
              { _id: req.params.id })
                .then(removedRole => {
                    if (!removedRole) {
                      return res.send(
                        httpStatus.NOT_FOUND
                      );
                    } else {
                      return swap(
                        req,
                        res,
                        next,
                        { removedRole: removedRole }
                      );
                    }
                  }
                ).catch(e => next(e));
          } else {
            res.send(
              httpStatus.BAD_REQUEST
            );
          }
        }).catch(e => next(e))
  );

};

module.exports = { list, get, update, remove, add, page };

