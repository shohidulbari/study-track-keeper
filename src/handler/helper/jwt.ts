const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
export const jwtSignToken = (data) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line max-len
    jwt.sign(data, process.env.JWT_SECRET, function(err, token) {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};

export const isAuthorized = async (req, res, next) => {
  if (!req.headers.authorization) return next(new Error('requestForbidden'));
  let getToken = req.headers.authorization;
  getToken = getToken.split(' ')[1];
  const decoded : any = await verify(getToken);
  req.requesterUserId = decoded['id'];
  return next();
};
