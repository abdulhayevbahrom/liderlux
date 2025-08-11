const response = require("../utils/response");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // let path = req.originalUrl;

    // let openRoutes = ["/api/admin/login"];
    // if (
    //   openRoutes.includes(path) ||
    //   path.includes("/api/product/all") ||
    //   path.includes("/api/contact/all")
    // )
    //   return next();

    // const token = req.headers.authorization?.split(" ")[1];
    // console.log("Authorization header:", req.headers.authorization);
    // console.log("Token:", token);
    // console.log(
    //   "JWT_SECRET_KEY env:",
    //   JSON.stringify(process.env.JWT_SECRET_KEY)
    // );
    // if (!token) return response.error(res, "Token topilmadi");

    // let result = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    // if (!result) return response.unauthorized(res, "Token yaroqsiz");

    // req.admin = result;
    next();
  } catch (err) {
    console.log(err);
    response.serverError(res, err.message);
  }
};

module.exports = authMiddleware;
