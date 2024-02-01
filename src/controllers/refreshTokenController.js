const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserToken } = require("../models/user.model");

const handleRefreshToken = async (req, res) => {
  console.log(`i am in the refresh token`, req.cookies);
    const cookies = req.cookies;

  console.log(`request of values \n`, req.cookies.jwt);
  console.log(`value of the userrrrrrrrrrrrrrrr\n`, req.user);
  console.log(`hhhhhhhhhhhhhhhh\n`, req.headers);
  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;
  const foundUser = await findUserToken(refreshToken);

  console.log(`found User in jwt \n`, foundUser);
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    //define roles here

    const accessToken = jwt.sign(
      { Username: decoded.Username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "300s" }
    );

    console.log(`value of the accessToken`, accessToken);
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken }