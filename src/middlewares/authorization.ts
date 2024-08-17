import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { log } from "util";

export default async (req: Request, res: Response, next: NextFunction) => {
  // extract token from authorization header
  // console.log(req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized", statusCode: 401 });
  }
  // console.log(token);

  // const payload = jwt.verify(token, process.env.SECRET_KEY || "secret");

  jwt.verify(
    token,
    process.env.SECRET_KEY || "secret",
    function (err: any, decoded: any) {
      if (err) {
        console.log(err.message);
        if (err.message === "jwt expired") {
          return res.status(401).json({
            message: "Jwt Expired, please re login",
            statusCode: 401,
            status: "expired jwt",
          });
        } else {
          return res.status(401).json({
            message: "Unauthorized",
            statusCode: 401,
            statusText: err.message || "error",
          });
        }
        throw new Error(err);
      } // Manage different errors here (Expired, untrusted...)
      // req.auth = decoded; // If no error, token info is returned in 'decoded'
      if (decoded) {
        res.locals.user = decoded;
      }
    }
  );

  next();

  // console.log(jwt.verify(token, process.env.SECRET_KEY || "secret"), "payload");

  // if (!payload) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // res.locals.user = payload;

  // console.log(next());

  // next();
};
