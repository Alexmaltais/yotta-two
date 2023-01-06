const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "le_nom_de_mon_chien_est_cadeau");
    req.userData = {
      email: decodedToken.email,
      role: decodedToken.role,
      jiraName: decodedToken.jiraName,
      userId: decodedToken.userId
    };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({message: "Echec d'authentification middleware"});
  }
};
