import * as fs from "fs";
const crypto = require("crypto");
import * as net from 'net';


//ByteArray-dataType

//const encryptedData = "U2FsdGVkX1+T8CowtIsNbJzQm2Y6kqPhjWpRjEjEu4c=";
//const secretKey = "your secret key";
const keyFile = "keyfile.txt";
const Ivfile = "iv.txt";
const keyData = fs.readFileSync(keyFile);
const keyIv = fs.readFileSync(Ivfile);

// const ivParse = keyIv;

// export async function decriptData(/*data: string*/callback: (data: string) => void) {
// export async function decriptData():Promise<string> {
// export async function decriptData():string {
//     const client = new net.Socket();
//     //#region  Test pAssed
//     //  client.connect(3000, '127.0.0.1', () => {
//     //     // send data to the server
//     //     client.write('send data');
//     //   });
//     //   client.on('data', async (data) => {
        
//     // //    globalData=data.toString();
//     //    globalData="cb4e781cf79ebe0217b3394c9e66db4a";
//     //     console.log("data :",data.toString())
//     //     const decipher = crypto.createDecipheriv("aes-256-cbc", keyData, keyIv);
//     //     let decrypted = await decipher.update(globalData, 'hex', 'utf8');
//     //     decrypted += decipher.final('utf8');
//     //     console.log("decrypted :",decrypted)
//     //     callback(decrypted.toString());
//     //   });
//     //#endregion
    
//     client.connect(3000, '127.0.0.1', () => {
//         client.write('send data');
//     });
//    // return new Promise(async (resolve, reject) => {
//         client.on('data', async (data) => {
//             let globalData:string=data.toString();
//             const decipher = crypto.createDecipheriv("aes-256-cbc", keyData, keyIv);
//             let decrypted = await decipher.update(globalData, 'hex', 'utf8');
//             decrypted += decipher.final('utf8');
//            return(decrypted);
//         });
//   //  });
 
// }

export async function decriptData(): Promise<string> {
        const client = new net.Socket();
    client.connect(3000, '127.0.0.1', () => {
        client.write('send data');
    });
    return new Promise(async (resolve) => {
        client.on('data', async (data) => {
            let globalData:string=data.toString();
            //aes-128-cfb 
            //ByteArray
            const decipher = crypto.createDecipheriv("aes-256-cbc", keyData, keyIv);
            let decrypted = await decipher.update(globalData, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            console.log("decrypted :",decrypted)
            resolve(decrypted);
        });
    });
}



export function encryptAES(data: string /*, secret: string*/): string {


 const host = "localhost";
  //const host = "192.168.137.1";
  //const port = 3000;
  const port = 3000;
  const IV_LENGTH = 16;

  const keyFile = "keyfile.txt";
  const Ivfile = "iv.txt";

  //const key = crypto.randomBytes(32); //generate 32 byte key
  //let iv = crypto.randomBytes(IV_LENGTH);

  //fs.writeFileSync(keyFile, key);
  //fs.writeFileSync(Ivfile, iv);

  const keyData = fs.readFileSync(keyFile);
  const ivKey = fs.readFileSync(Ivfile);

  const cipher = crypto.createCipheriv("aes-256-cbc", keyData, ivKey);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  // return encrypted;

  const client = new net.Socket();
  client.connect(port, host, () => {
    client.write(encrypted);
    
    client.end();
  });
 const encriptedreturn:string=encrypted;
  return encriptedreturn;
}
