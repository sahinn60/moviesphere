const success = (res, data, message = 'Success', statusCode = 200, pagination = null) => {
  const response = { success: true, message, data };
  if (pagination) response.pagination = pagination;
  return res.status(statusCode).json(response);
};

const error = (res, message = 'Something went wrong', statusCode = 500, errorCode = null) => {
  const response = { success: false, message };
  if (errorCode) response.error = errorCode;
  return res.status(statusCode).json(response);
};

const created = (res, data, message = 'Created successfully') =>
  success(res, data, message, 201);

module.exports = { success, error, created };
