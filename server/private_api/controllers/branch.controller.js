const Branch = require('../../db/models/Branch');
const httpStatus = require('http-status');


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

/**
 * Get branches list.
 * @returns {Branches[]}
 */
function list(req, res, next) {
  catchErrors(
    Branch.find({})
          .then(branches => {
            res.json(
              [
                { Total: branches.length },
                branches
              ]
            );
          })
  );
}

/**Get one page of branches
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
function page(req, res, next) {
  catchErrors(
    Branch.find({})
        .then(branches => {
          formPage(
            req.headers.page,
            req.headers.limit,
            branches,
            branches.length
          ).then(page =>
            res.json({
              page
            })
          ).catch(e => next(e));
        })
  );
}

/**
 * Get branch
 * @requires {objectId} id: req.params.id
 * @returns {Branch}
 */
function get(req, res, next) {
  catchErrors(
    Branch.findOne({ _id: req.params.id })
          .then(branch => {
            if (!branch) {
              return res.send(httpStatus.NOT_FOUND);
            }
            return res.json(branch);
          })
          .catch(e => next(e))
  );
}


/**
 * Update existing branch
 *
 * @requires {objectId} id: req.params.id
 * @parameter {string} name: req.headers.name
 * @parameter {string} email: req.headers.email,
 * @parameter {string} phone: req.headers.phone
 * @parameter {string} fax: req.headers.fax
 * @parameter {string} address: req.headers.address
 * @parameter {string} information: req.headers.information
 *
 * @returns {Branch}
 */
function update(req, res, next) {

  const data = {
    name: req.headers.name,
    email: req.headers.email,
    phone: req.headers.phone,
    fax: req.headers.fax,
    address: req.headers.address,
    information: req.headers.information
  };

  catchErrors(
    Branch.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true })
          .then(updatedBranch =>
            res.status(200).json({
              updatedBranch
            }))
          .catch(e => next(e))
  );
}


module.exports = { list, get, update, page };

