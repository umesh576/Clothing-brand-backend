import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h",
  });

  return token;
};
