const jwt = require('jsonwebtoken');

// eslint-disable-next-line no-unused-vars
const jwtSignToken = (data) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line max-len
    jwt.sign(data, process.env.JWT_SECRET, function(err, token) {
      if (err) reject(err);
      resolve(token);
    });
  });
};

export default jwtSignToken;
