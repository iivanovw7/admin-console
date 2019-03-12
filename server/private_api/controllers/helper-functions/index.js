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
 *
 * @returns {Promise.<void>}
 */
export const formPage = async (currPage = 1, currLimit = 10, list = []) => {

  //needed to keep input numbers inside certain limits
  //in order to prevent unpredicted outputs
  function limitInt(min, max, val) {
    return Math.round(Math.min(Math.max(val, min), max));
  };

  //applying limits of elements for one page
  const limit = limitInt(1, 25, currLimit);
  //applying limits for maximum page number value
  const pages = Math.ceil(list.length / limit);
  //applying limits for input pageNumber value
  const page = limitInt(1, pages, currPage);

  const skipped = (page * limit) - limit;
  const output = list.slice(skipped, skipped + limit);

  return { page, limit, pages, output };
};
