import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      token.replace("Bearer ", ""), //to remove Bearer from token
      process.env.JWT_SECRET
    );

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Token is not valid", error: error.message });
  }
};

export default auth;
