const jwt = require('jsonwebtoken');

export const middlewares = {
  heruekaExport(req, res, next) {
    if (req.originalUrl == '/heureka.xml') {
      res.status(200);
      res.set('Content-Type', 'text/xml');
      return res.send('<xml></xml>');
    }
    next();
  },
  checkJwt(req, res, next) {
    if (req.originalUrl == '/jwt') {
      try {
        const token = req.headers.authorization.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'secret');
        return res.status(200).json({
          decoded,
        });
      } catch (err) {
        return res.status(401).json({
          message: 'Authentification Failed',
        });
      }
    }
    next();
  },
};

export default middlewares;
