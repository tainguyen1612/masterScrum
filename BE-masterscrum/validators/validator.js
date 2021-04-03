const {check} = require('express-validator');

let validateRegisterUser = () => {
  return [ 
    check('name', 'username does not Empty').not().isEmpty(),
    //check('name', 'username must be Alphanumeric').isAlphanumeric(),
    check('name', 'username more than 6 degits').isLength({ min: 6 }),
    check('phone', 'phone is not valid').isLength({ min: 10 }).matches(/((09|03|07|08|05)+([0-9]{8})\b)/g),
    check('email', 'Invalid does not Empty').not().isEmpty().isEmail(),
    check('password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validateLogin = () => {
  return [ 
    check('email', 'Invalid does not Empty').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validate = {
  validateRegisterUser,
  validateLogin
};

module.exports = {validate};