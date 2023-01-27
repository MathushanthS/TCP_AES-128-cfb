import * as crypto from 'crypto';
//import { PaddingMode } from 'crypto';
import * as net from 'net';

// const key = crypto.randomBytes(16);
// const iv = crypto.randomBytes(16);
const key:Uint8Array = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])  ;
const iv:Uint8Array = new Uint8Array([21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ])  ;
// const host = "localhost";
const host = "192.168.137.1";
// const host = "192.168.1.100";
// const host = "127.0.0.1";
// const port = 3000;
const port = 5353;

// const byteArray = new Uint8Array([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
const byteArray = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

export function encryptingService(data: Uint8Array) {
    try{
    const cipher = crypto.createCipheriv('aes-128-cfb', key, iv);
    cipher.setAutoPadding(false);
//cipher.pad(PaddingMode.PKCS7);
    let encrypted = cipher.update(Buffer.from(byteArray));
    encrypted = Buffer.concat([encrypted, cipher.final()]);

   // const bufferencrypted = Buffer.from(encrypted)
    //const base64Data = encrypted.toString('base64');

    console.log("SendData :", encrypted)/////////////////////////////////////////////////////////////////////////////////////////


    // TCP/IP Communication
    const client = new net.Socket();
    //#region reffer ClientCode
    // client.connect(port, host, () => {
    //     client.write(encrypted);
    //     client.end();
    // });
    // client.connect(port, host, () => {
    //     console.log('Connected to server');
    //   });
      
    //   client.on('data', (data: Buffer) => {
    //     console.log(encrypted);
    //     client.destroy();
    //   });
      
    //   client.on('close', () => {
    //     console.log('Connection closed');
    //   });
    //#endregion

    client.connect(port, host, () => {
        console.log('Connected to server');
        client.write(encrypted);
      });
      
      client.on('--DISCONNECTED--', () => {
        client.write("--DISCONNECTED--");
        console.log('Connection closed');
      });
      client.on('close', () => {
        console.log('Connection closed');
      });
      client.on('data', (data) => {
        
        console.log(`Received: ${data}`);
    });
    return encrypted;
    }
    catch(error){
        console.log("Error :",error)
    }
}


export async function decryptingService(): Promise<Uint8Array> {

    //const buffer: Buffer = Buffer.from([1, 2, 3, 4, 5, 6]);
const buffer:Uint8Array=new Uint8Array([0,132,212,86,112,182,20,200,218,76,56,40,67,89,204,217])


    const client = new net.Socket();
    client.connect(port, host, () => {
        client.write('send data');
    });
    return new Promise(async (resolve) => {
        //client.on('data', async (data) => {
            const decipher = crypto.createDecipheriv('aes-128-cfb', key, iv);
            let decrypted = decipher.update(buffer);
            // decrypted += decipher.final('utf8');
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            console.log("decrypted :", decrypted)

            const byteArray: Uint8Array = new Uint8Array(decrypted.length);
            for (let i = 0; i < decrypted.length; i++) {
                byteArray[i] = decrypted[i] & 0xff;
                byteArray[i] += decrypted[i] / 128 >>> 0;
            }

            console.log("byteArray :", byteArray)

            resolve(byteArray);
        });
    //});

}
