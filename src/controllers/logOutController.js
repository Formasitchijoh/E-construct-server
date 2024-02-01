const bcrypt = require('bcrypt')
const { findUserToken, updateUserToken} = require('../models/user.model')
const handleLogOut = async(req, res) =>{
const { email } = req.body
    const cookies = req.cookies;

    console.log(`cccccccccccccccccccccc\n`, cookies);
    if(!cookies?.jwt) return res.sendStatus(204);

    const refreshToken = cookies.jwt

    const foundUser = await  findUserToken({refreshToken})
    if(!foundUser){
        res.clearCookie('jwt', {httpOnly:true, sameSite:"None", secure:true})
        return res.sendStatus(204)
    }

    foundUser.refreshToken = ' ';
    const result = await updateUserToken(email, ' ');

    console.log(result);
    res.clearCookie('jwt', { httpOnly:true});
    res.sendStatus(204)
}

module.exports = { handleLogOut}