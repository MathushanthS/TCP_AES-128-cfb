const crypto = require("crypto");
import * as net from "net";


//#region  Common Consts
// const host = "192.168.137.1";
// const port = 5353;
const host = "localhost";
const port = 3000;

let decoder = new TextDecoder();
let encoder = new TextEncoder();


const key = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
const iv = new Uint8Array([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]);
//#endregion


export function encryptDes(data: string) {

  let byteArray = encoder.encode(data);

  //aes-128-cfb Emncryption
  const cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
  let encrypted = cipher.update(Buffer.from(byteArray));
  encrypted = Buffer.concat([encrypted, cipher.final()]);



  console.log("SendData :", encrypted)/////////////////////////////////////////////////////////////////////////////////////////


  // TCP/IP Communication
        const client = new net.Socket();
        client.connect(port, host, () => {
          client.write(encrypted);

          const textEncoder = new TextEncoder();
          const data = textEncoder.encode("--DISCONNECTED--");
          client.end();
        });
}

export async function decriptData(): Promise<string> {


  const client = new net.Socket();

  client.connect(3000, '127.0.0.1', () => {
    client.write('send data');
  });

  return new Promise(async (resolve) => {

    client.on('data', async (data) => {

  
      //let strDecoded = decoder.decode(data);
      const decipher = crypto.createDecipheriv('aes-128-cfb', key, iv);
      let decrypted = decipher.update(data);

     console.log("received Data :", data) /////////////////////////////////////////////////////////////////////////////////////////
   /////////////////////////////////////////////////////////////////////////////////////////

      decrypted = Buffer.concat([decrypted, decipher.final()]);
      const encryptedUint = new Uint8Array(decrypted);

      let str = decoder.decode(decrypted);

      console.log("decrypted :", str)
      //const returnVal:string=String.fromCharCode(decrypted)
      resolve(str);

    });
  });
}

export function encryptAnotherAlgorithm() {
  // var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // // The initialization vector (must be 16 bytes)
  // var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

  // // Convert text to bytes (must be a multiple of the segment size you choose below)
  // var text = '123456789012345678901234';
  // //var text = 'ffxtMustBeAMultipleOfSegment1111abc';

  // var textBytes = aesjs.utils.utf8.toBytes(text);

  // // The segment size is optional, and defaults to 1
  // var segmentSize = 1;
  // var aesCfb = new aesjs.ModeOfOperation.cfb(key, iv, segmentSize);
  // var encryptedBytes = aesCfb.encrypt(textBytes);

  // // To print or store the binary data, you may convert it to hex
  // var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

  // var byteArray = new Uint8Array();
  // byteArray = hexStringToByteArray(encryptedHex);
  // //var numBytes = encryptedHex.length;
  // //var byteArray = new Uint8Array(numBytes);
  // //for (var i = 0; i < numBytes; i++) {
  // //    byteArray[i] = parseInt(encryptedHex.substr(i * 2, 2), 16);
  // //}
  // client.write(byteArray);
}