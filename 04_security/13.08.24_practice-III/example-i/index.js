import bcrypt from 'bcrypt';

const salt = await bcrypt.genSalt(10); // $2b$10$M1.AtS4VgeK3J7Hl6M9Tde
const salt2 = await bcrypt.genSalt(10); // $2b$10$UmE47LDooWboi0.8nnCLKO
console.log('salt value:', salt);
console.log('salt2 value:', salt2);

const visaCard = '4234242342342342';
const hashValue = await bcrypt.hash(visaCard, salt);    // $2b$10$M1.AtS4VgeK3J7Hl6M9Tdegtxr03LcVj7jHmnbllduEZs7kRjxqeO
const hashValue2 = await bcrypt.hash(visaCard, salt2);  // $2b$10$UmE47LDooWboi0.8nnCLKOyeIw5LA6GFbxUMU9JOB4YrmhWvHhtTK

console.log('hashValue:', hashValue)
console.log('hashValue2:', hashValue2)

// compare
const isMatch = await bcrypt.compare("4234242342342335", hashValue);
console.log('isMatch', isMatch)