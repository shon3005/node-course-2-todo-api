const bcrypt = require('bcryptjs');
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$T828lmzkGGwfLfxrCAZXK.fQB99C4kRPA2XCjJM/EGm5tH6fR0yey';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});

//
// var data = {
//     id: 10
// };
//
// // value you send back to the user when sign up or login
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// // exact same value back, token must be unaltered, secret must be same
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// create hash
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString();
// };

// this changes the data
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

// verify
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('data was not changed');
// } else {
//     console.log('data was changed dont trust');
// }
