import bcrypt from 'bcrypt';
const pwd = '1234';
console.log(pwd);
const salt = await bcrypt.genSalt(12);
const salt2 = await bcrypt.genSalt(12);

const pwdHashed = await bcrypt.hash(pwd,salt);
const pwdHashed2 = await bcrypt.hash(pwd, 12);
console.log(pwdHashed);
console.log(pwdHashed2);
