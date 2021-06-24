/* eslint-disable require-jsdoc */
export default function(err, req, res, next) {
  res.status(err.status).send({
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
    },
  });
};
