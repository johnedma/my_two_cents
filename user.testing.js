var User = require('./server/models/user.model.js');

//mock up req object with a body
var req = {};
req.body = {
  email: 'j@d.com',
  age: 55,
  password: 'password'
};

var user = new User(req.body);
console.log(user);
user.setPassword(req.body.password);
var passwordIsValid = user.validPassword('password');
console.log(passwordIsValid);
console.log('JWT', user.generateJwt());
