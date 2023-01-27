import * as fs from 'fs';
const crypto = require('crypto');

//const encryptedData = "U2FsdGVkX1+T8CowtIsNbJzQm2Y6kqPhjWpRjEjEu4c=";
//const secretKey = "your secret key";
const keyFile = 'keyfile.txt';
const Ivfile = 'iv.txt';
const keyData = fs.readFileSync(keyFile);
const keyIv = fs.readFileSync(Ivfile);


//const key = CryptoJS.enc.Hex.parse(secretKey);
// const ivParse = CryptoJS.enc.Hex.parse(keyIv.toString());
const ivParse = keyIv;

export function decriptData(data:string):void{
    // console.log("Decript File :",data);
    // console.log("Decript KeyData :",keyData.toString());
    // console.log("Decript ivParse :",ivParse);
// const decryptedData = CryptoJS.AES.decrypt(data, keyData.toString()).toString(CryptoJS.enc.Utf8);

// const decryptedData = CryptoJS.AES.decrypt(data, keyData.toString(), ivParse ).toString(CryptoJS.enc.Utf8);
const decipher = crypto.createDecipheriv('aes-256-cbc', keyData, keyIv);
let decrypted = decipher.update(data, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);
//console.log(decryptedData);

//console.log("Decrypted Data :",decryptedData);
}