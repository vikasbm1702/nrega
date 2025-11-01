// Pagination utilities

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 1000;
const DEFAULT_OFFSET = 0;

// Middleware to parse and validate pagination parameters
const paginationMiddleware = (req, res, next) => {
  try {
    let limit = parseInt(req.query.limit) || DEFAULT_LIMIT;
    let offset = parseInt(req.query.offset) || DEFAULT_OFFSET;

    // Validate and constrain limits
    if (limit < 1) limit = DEFAULT_LIMIT;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;
    if (offset < 0) offset = DEFAULT_OFFSET;

    req.pagination = {
      limit,
      offset,
      skip: offset
    };

    next();
  } catch (error) {
    req.pagination = {
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET,
      skip: DEFAULT_OFFSET
    };
    next();
  }
};

// Helper to build paginated response
const buildPaginatedResponse = (data, totalCount, limit, offset) => {
  return {
    data,
    pagination: {
      limit,
      offset,
      total: totalCount,
      pages: Math.ceil(totalCount / limit),
      currentPage: Math.floor(offset / limit) + 1
    }
  };
};

module.exports = {
  paginationMiddleware,
  buildPaginatedResponse,
  DEFAULT_LIMIT,
  MAX_LIMIT,
  DEFAULT_OFFSET
};