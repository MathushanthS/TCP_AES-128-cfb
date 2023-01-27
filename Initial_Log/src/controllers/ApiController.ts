import crypto from 'crypto';
import * as net from 'net';
import * as fs from 'fs';
//import { randomBytes } from 'crypto';

export function getAndPrintUserInput(input:string): void {
    console.log(`You entered: ${input}`);
}


const host = 'localhost';
const port = 3000;
const IV_LENGTH = 16;


const key = crypto.randomBytes(32); //generate 32 byte key
let iv = crypto.randomBytes(IV_LENGTH);

const keyFile = 'keyfile.txt';
const Ivfile = 'iv.txt';

// write the key to a file
fs.writeFileSync(keyFile, key);
fs.writeFileSync(Ivfile, iv);
//const ivParse = CryptoJS.enc.Hex.parse(iv.toString());
// later when you need to decrypt the data
const keyData = fs.readFileSync(keyFile);
const ivKey = fs.readFileSync(Ivfile);
console.log("Iv :",iv)
console.log("IvKey :",ivKey)




const secretkey="my initial"
export function encryptAES(data: string, secret: string):void {
    //const key = CryptoJS.enc.Hex.parse(secretkey)
    //const sharedSecret = crypto.randomBytes(32);
//Buffer.from("FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=", 'hex')

    const cipher = crypto.createCipheriv('aes-256-cbc',keyData ,ivKey);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
   // return encrypted;

    const client = new net.Socket();
    client.connect(port, host, () => {
        client.write(encrypted);
        client.end();
    });
}