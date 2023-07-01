import jwt from "jsonwebtoken";

export const requireSignin = async (req, res, next) => {
try{
  const token = req.headers["authorization"];
  if (!token) {
    return res.send({
      message: "please provide token!",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return res.send({
        message: "invalid token access denied",
      });
    }
    if (result) {
      req.user = result;
      next();
    }
  });
}catch(err){
  return res.status(500).send({
    success: false,
    message: "ssomthing went wrong",
    err,
  });
}
};






