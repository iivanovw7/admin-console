export const catchErrors = fn => {
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
export const formPage =
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
