import jwt from 'jsonwebtoken';
import { accessTokenSecret } from '../routes/loginRoute.js'; 

export const authenticationMw = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Giriş yapın." });

  jwt.verify(token, accessTokenSecret, (err, decodedToken) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }

    // "claim" alanını kontrol ederek sadece "admin" yetkisine sahip kullanıcılara izin ver.
    if (decodedToken && decodedToken.claim === "admin") {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: "Yetkiniz yok." });
    }
  });
};