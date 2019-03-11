const Branch = require('../../db/models/Branch');
const httpStatus = require('http-status');
import { formPage } from './helper-functions';

/**
 * Get branches list.
 * @returns {[
 * { Total: branches.length },
 * { Results: branches }
 * ]}
 */
export const list = async (req, res) => {

  const branches = await Branch.find({});

  if (branches) {
    res.status(200).json([
      { Total: branches.length },
      { Results: branches }]
    );
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};


/**Get one page of branches
 *
 * @requires {number} page: req.headers.page
 * @requires {number} limit: req.headers.limit
 *
 */
export const page = async (req, res) => {

  const branches = await Branch.find({});

  if (branches) {
    const page = await
      formPage(
        req.headers.page,
        req.headers.limit,
        branches,
        branches.length
      );
    res.status(200).json(page);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};


/**
 * Get branch
 * @requires {objectId} id: req.params.id
 * @returns {Branch}
 */
export const get = async (req, res) => {

  const branch = await Branch.find({});

  if (branch) {
    res.status(200).json(branch);
  } else {
    res.send(httpStatus.NOT_FOUND);
  }
};


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
export const update = async (req, res) => {

  const data = await {
    name: req.headers.name,
    email: req.headers.email,
    phone: req.headers.phone,
    fax: req.headers.fax,
    address: req.headers.address,
    information: req.headers.information
  };

  const newBranch = await
    Branch.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );

  if (newBranch) {
    res.status(200).json({
      Added: newBranch
    })
  } else {
    res.send(httpStatus.BAD_REQUEST);
  }
};


module.exports = { list, get, update, page };

