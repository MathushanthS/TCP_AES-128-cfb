import crypto from 'crypto';
import * as net from 'net';


export function getAndPrintUserInput(input:string): void {
    console.log(`You entered: ${input}`);
}


const host = 'localhost';
const port = 3000;
const IV_LENGTH = 16;


export function encryptAES(data: string, secret: string):void {

    
    let iv = crypto.randomBytes(IV_LENGTH);
    const sharedSecret = crypto.randomBytes(32);
//Buffer.from("FoCKvdLslUuB4y3EZlKate7XGottHski1LmyqJHvUhs=", 'hex')

    const cipher = crypto.createCipheriv('aes-256-cbc',sharedSecret ,iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
   // return encrypted;

    const client = new net.Socket();
    client.connect(port, host, () => {
        client.write(encrypted);
        client.end();
    });
}